import {
  extractDocument,
  extractParties,
  extractClaims,
  extractDescription,
  extractDrawings,
  extractRelationships,
  extractClassifications,
  extractAbstract,
} from "../patent";

import {
  getPatentRoot,
  getBibliographic,
} from "./parserHelpers";

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
 * Normalize parsed USPTO XML into our internal Patent model.
 */
export function extractPatent(parsedXml) {
  const patentType = detectPatentType(parsedXml);

  const root = getPatentRoot(parsedXml);

  const bibliographic = getBibliographic(root);

  return {
    document: extractDocument(
      bibliographic,
      patentType
    ),

    parties: extractParties(
      bibliographic
    ),

    classifications: extractClassifications(
      bibliographic
    ),

    relationships: extractRelationships(
      bibliographic
    ),

    abstract: extractAbstract(root),

    description: extractDescription(
      root
    ),

    drawings: extractDrawings(
      root
    ),

    claims: extractClaims(
      root
    ),

    raw: parsedXml,
  };
}