/**
 * Formats document-level metadata.
 *
 * Supports:
 * 1. Backend API response
 * 2. Parser/formatter pipeline
 */
export default function formatDocument(document = {}) {
  const metadata = document.metadata ?? document;

  return {
    // ----------------------------
    // General
    // ----------------------------
    type:
      document.document_type ??
      document.type ??
      metadata.type ??
      metadata.patentType ??
      null,

    status:
      document.status ??
      metadata.status ??
      "Success",

    // ----------------------------
    // Title
    // ----------------------------
    title:
      metadata.title ??
      document.title ??
      null,

    // ----------------------------
    // Country
    // ----------------------------
    country:
      metadata.country ??
      document.country ??
      null,

    // ----------------------------
    // Patent Numbers
    // ----------------------------
    patentNumber:
      metadata.patent_number ??
      metadata.patentNumber ??
      document.patentNumber ??
      document.publicationNumber ??
      metadata.publication_number ??
      metadata.publicationNumber ??
      null,

    publicationNumber:
      metadata.publication_number ??
      metadata.publicationNumber ??
      document.publicationNumber ??
      null,

    publicationDate:
      metadata.publication_date ??
      metadata.publicationDate ??
      document.publicationDate ??
      null,

    applicationNumber:
      metadata.application_number ??
      metadata.applicationNumber ??
      document.applicationNumber ??
      null,

    applicationDate:
      metadata.application_date ??
      metadata.applicationDate ??
      document.applicationDate ??
      null,

    // ----------------------------
    // Misc
    // ----------------------------
    kind:
      metadata.kind_code ??
      metadata.kind ??
      document.kind ??
      null,

    language:
      metadata.language ??
      document.language ??
      "en",
  };
}