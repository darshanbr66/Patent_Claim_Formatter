import {
  get,
  toArray,
} from "../parser/parserHelpers";

/**
 * Creates a normalized person object.
 */
function createPerson(addressbook) {
  if (!addressbook) {
    return null;
  }

  const firstName = addressbook["first-name"] ?? null;
  const lastName = addressbook["last-name"] ?? null;

  return {
    firstName,
    lastName,
    fullName: [firstName, lastName]
      .filter(Boolean)
      .join(" "),
    organization: addressbook.orgname ?? null,
    address: addressbook.address ?? null,
  };
}

/**
 * Creates a normalized organization object.
 */
function createOrganization(addressbook) {
  if (!addressbook) {
    return null;
  }

  return {
    name: addressbook.orgname ?? null,
    address: addressbook.address ?? null,
  };
}

/**
 * Extract patent parties.
 *
 * @param {object} bibliographic
 */
export function extractParties(bibliographic) {
  const usParties = get(bibliographic, "us-parties", {});

  // -------------------------
  // Inventors
  // -------------------------

  const inventors = toArray(
    get(usParties, "inventors.inventor")
  )
    .map((inventor) =>
      createPerson(inventor.addressbook)
    )
    .filter(Boolean);

  // -------------------------
  // Applicants
  // -------------------------

  const applicants = toArray(
    get(usParties, "us-applicants.us-applicant")
  )
    .map((applicant) =>
      createOrganization(applicant.addressbook)
    )
    .filter(Boolean);

  // -------------------------
  // Agents / Attorneys
  // -------------------------

  const agents = toArray(
    get(usParties, "agents.agent")
  )
    .map((agent) =>
      createPerson(agent.addressbook)
    )
    .filter(Boolean);

  // -------------------------
  // Assignees
  // -------------------------

  const assignees = toArray(
    get(bibliographic, "assignees.assignee")
  )
    .map((assignee) =>
      createOrganization(assignee.addressbook)
    )
    .filter(Boolean);

  // -------------------------
  // Examiner
  // -------------------------

  const primaryExaminer = get(
    bibliographic,
    "examiners.primary-examiner"
  );

  const examiner = primaryExaminer
    ? {
        firstName:
          primaryExaminer["first-name"] ?? null,

        lastName:
          primaryExaminer["last-name"] ?? null,

        fullName: [
          primaryExaminer["first-name"],
          primaryExaminer["last-name"],
        ]
          .filter(Boolean)
          .join(" "),
      }
    : null;

  return {
    inventors,
    applicants,
    assignees,
    agents,
    examiner,
  };
}