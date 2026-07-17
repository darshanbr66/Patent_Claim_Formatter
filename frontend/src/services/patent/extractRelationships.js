import {
  get,
  toArray,
} from "../parser/parserHelpers";

/**
 * Creates a normalized document reference.
 */
function createDocumentReference(documentId) {
  if (!documentId) {
    return null;
  }

  return {
    country: documentId.country ?? null,
    docNumber: documentId["doc-number"] ?? null,
    kind: documentId.kind ?? null,
    date: documentId.date ?? null,
  };
}

function extractParentApplications(relatedDocuments) {
  const parent = get(
    relatedDocuments,
    "parent-doc.document-id"
  );

  return parent ? [createDocumentReference(parent)] : [];
}

function extractProvisionalApplications(relatedDocuments) {
  const provisionals = toArray(
    get(
      relatedDocuments,
      "provisional-application"
    )
  );

  return provisionals
    .map((item) =>
      createDocumentReference(item["document-id"])
    )
    .filter(Boolean);
}

function extractContinuationApplications(relatedDocuments) {
  const continuations = toArray(
    get(
      relatedDocuments,
      "continuation-in-part"
    )
  );

  return continuations
    .map((item) =>
      createDocumentReference(item["parent-doc"]?.["document-id"])
    )
    .filter(Boolean);
}

function extractRelatedPublications(relatedDocuments) {
  const publications = toArray(
    get(
      relatedDocuments,
      "related-publication"
    )
  );

  return publications
    .map((item) =>
      createDocumentReference(item["document-id"])
    )
    .filter(Boolean);
}

/**
 * Extract patent relationships.
 *
 * @param {object} bibliographic
 */
export function extractRelationships(bibliographic) {
  const relatedDocuments = get(
    bibliographic,
    "us-related-documents",
    {}
  );

  return {
    parentApplications:
      extractParentApplications(
        relatedDocuments
      ),

    childApplications: [],

    provisionalApplications:
      extractProvisionalApplications(
        relatedDocuments
      ),

    continuationApplications:
      extractContinuationApplications(
        relatedDocuments
      ),

    divisionalApplications: [],

    continuationInPartApplications: [],

    foreignPriority: [],

    relatedPublications:
      extractRelatedPublications(
        relatedDocuments
      ),
  };
}