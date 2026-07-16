/**
 * Safely returns a nested property.
 */
function get(object, path, defaultValue = null) {
  const value = path
    .split(".")
    .reduce((current, key) => current?.[key], object);

  return value ?? defaultValue;
}

/**
 * Extracts the core patent document information.
 *
 * @param {object} root USPTO patent root node
 * @param {string} patentType
 */
export function extractDocument(root, patentType) {
  const bibliographic =
    root["us-bibliographic-data-grant"] ??
    root["us-bibliographic-data-application"] ??
    {};

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

    title:
      get(bibliographic, "invention-title.#text") ??
      get(bibliographic, "invention-title"),

    kind: get(
      bibliographic,
      "publication-reference.document-id.kind"
    ),

    language: root["@_lang"] ?? null,

    publicationDate: get(
      bibliographic,
      "publication-reference.document-id.date"
    ),

    applicationDate: get(
      bibliographic,
      "application-reference.document-id.date"
    ),

    country: root["@_country"] ?? null,

    seriesCode:
      bibliographic["us-application-series-code"] ?? null,
  };
}