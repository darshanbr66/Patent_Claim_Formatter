/**
 * Returns the text content of an XML node.
 */
function getNodeText(node) {
  if (node == null) {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  return node["#text"] ?? "";
}

/**
 * Generic reference creator.
 */
function createReference(type, node) {
  if (!node) {
    return null;
  }

  return {
    type,
    idref: node["@_idref"] ?? null,
    text: getNodeText(node),
  };
}

/**
 * Parse a claim reference.
 *
 * <claim-ref idref="CLM-00001">claim 1</claim-ref>
 */
export function parseClaimReference(node) {
  return createReference("claim", node);
}

/**
 * Parse a figure reference.
 *
 * <figref idref="FIG-00001">FIG. 1</figref>
 */
export function parseFigureReference(node) {
  return createReference("figure", node);
}

/**
 * Parse a table reference.
 *
 * <table-ref idref="TBL-00001">Table 1</table-ref>
 */
export function parseTableReference(node) {
  return createReference("table", node);
}

/**
 * Detects the XML node type automatically.
 */
export function parseReference(type, node) {
  switch (type) {
    case "claim-ref":
      return parseClaimReference(node);

    case "figref":
      return parseFigureReference(node);

    case "table-ref":
      return parseTableReference(node);

    default:
      return null;
  }
}