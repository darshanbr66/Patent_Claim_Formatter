import {
  get,
  getText,
} from "../parser/parserHelpers";

/**
 * Extract the core patent document information.
 *
 * @param {object} bibliographic
 * @param {string} patentType
 */
export function extractDocument(
  bibliographic,
  patentType
) {
  return {
    patentType,

    publicationNumber: get(
      bibliographic,
      "publication-reference.document-id.doc-number"
    ),

    applicationNumber: get(
      bibliographic,
      "application-reference.document-id.doc-number"
    ),

    title: getText(
      get(
        bibliographic,
        "invention-title"
      )
    ),

    kind: get(
      bibliographic,
      "publication-reference.document-id.kind"
    ),

    language: null,

    publicationDate: get(
      bibliographic,
      "publication-reference.document-id.date"
    ),

    applicationDate: get(
      bibliographic,
      "application-reference.document-id.date"
    ),

    country: get(
      bibliographic,
      "publication-reference.document-id.country"
    ),

    seriesCode: get(
      bibliographic,
      "us-application-series-code"
    ),
  };
}