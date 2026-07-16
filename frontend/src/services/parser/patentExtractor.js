import {
  extractDocument,
  extractParties,
  extractClaims,
  extractDescription,
  extractDrawings,
  extractRelationships,
  extractClassifications,
} from "../patent";

/**
 * Detect the patent document type.
 */
function detectPatentType(parsedXml) {
  if (parsedXml["us-patent-grant"]) {
    return "grant";
  }

  if (parsedXml["us-patent-application"]) {
    return "application";
  }

  throw new Error("Unsupported patent document.");
}

/**
 * Return the USPTO patent root node.
 */
function getPatentRoot(parsedXml) {
  if (parsedXml["us-patent-grant"]) {
    return parsedXml["us-patent-grant"];
  }

  if (parsedXml["us-patent-application"]) {
    return parsedXml["us-patent-application"];
  }

  throw new Error("Patent root node not found.");
}

/**
 * Normalize parsed USPTO XML into our internal Patent model.
 */
export function extractPatent(parsedXml) {
  const patentType = detectPatentType(parsedXml);
  const root = getPatentRoot(parsedXml);

  return {
    document: extractDocument(root, patentType),

    parties: extractParties(root),

    classifications: extractClassifications(root),

    relationships: extractRelationships(root),

    abstract: null,

    description: extractDescription(root),

    drawings: extractDrawings(root),

    claims: extractClaims(root),

    raw: parsedXml,
  };
}