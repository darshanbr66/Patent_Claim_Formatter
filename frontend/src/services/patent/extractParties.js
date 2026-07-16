/**
 * Ensures a value is always returned as an array.
 */
function toArray(value) {
  if (!value) return [];

  return Array.isArray(value) ? value : [value];
}

/**
 * Safely reads a nested property.
 */
function get(object, path, defaultValue = null) {
  const value = path
    .split(".")
    .reduce((current, key) => current?.[key], object);

  return value ?? defaultValue;
}

/**
 * Creates a normalized person object.
 */
function createPerson(node) {
  if (!node) return null;

  const firstName =
    node["first-name"] ??
    node.firstName ??
    null;

  const lastName =
    node["last-name"] ??
    node.lastName ??
    null;

  return {
    firstName,
    lastName,
    fullName: [firstName, lastName]
      .filter(Boolean)
      .join(" "),
  };
}

/**
 * Creates a normalized organization object.
 */
function createOrganization(node) {
  if (!node) return null;

  return {
    name:
      node.orgname ??
      node.name ??
      null,
  };
}

/**
 * Extract inventors.
 */
function extractInventors(bibliographic) {
  const inventors = get(
    bibliographic,
    "parties.inventors.inventor",
    []
  );

  return toArray(inventors)
    .map((inventor) =>
      createPerson(inventor?.addressbook)
    )
    .filter(Boolean);
}

/**
 * Extract applicants.
 */
function extractApplicants(bibliographic) {
  const applicants = get(
    bibliographic,
    "parties.applicants.applicant",
    []
  );

  return toArray(applicants)
    .map((applicant) =>
      createPerson(applicant?.addressbook)
    )
    .filter(Boolean);
}

/**
 * Extract assignees.
 */
function extractAssignees(bibliographic) {
  const assignees = get(
    bibliographic,
    "assignees.assignee",
    []
  );

  return toArray(assignees)
    .map((assignee) =>
      createOrganization(
        assignee?.addressbook
      )
    )
    .filter(Boolean);
}

/**
 * Extract agents / attorneys.
 */
function extractAgents(bibliographic) {
  const agents = get(
    bibliographic,
    "parties.agents.agent",
    []
  );

  return toArray(agents)
    .map((agent) =>
      createPerson(agent?.addressbook)
    )
    .filter(Boolean);
}

/**
 * Extract examiner.
 */
function extractExaminer(bibliographic) {
  const examiner = get(
    bibliographic,
    "parties.examiners.primary-examiner.addressbook"
  );

  if (!examiner) {
    return null;
  }

  return createPerson(examiner);
}

/**
 * Extract patent parties.
 */
export function extractParties(root) {
  const bibliographic =
    root["us-bibliographic-data-grant"] ??
    root["us-bibliographic-data-application"] ??
    {};

  return {
    inventors: extractInventors(bibliographic),

    applicants: extractApplicants(bibliographic),

    assignees: extractAssignees(bibliographic),

    agents: extractAgents(bibliographic),

    examiner: extractExaminer(bibliographic),
  };
}