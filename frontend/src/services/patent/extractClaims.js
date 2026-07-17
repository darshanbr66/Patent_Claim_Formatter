import {
  get,
  toArray,
} from "../parser/parserHelpers";

import {
  parseClaimText,
} from "../parser/richText";

/**
 * Parse one USPTO claim.
 */
function parseClaim(claimNode) {
  const rootClaimText = get(claimNode, "claim-text");

  if (!rootClaimText) {
    return null;
  }

  const paragraph = parseClaimText(rootClaimText);

  const references = paragraph.references ?? [];

  const dependentReference = references.find(
    (reference) => reference.type === "claim"
  );

  return {
    id: claimNode["@_id"] ?? null,

    number: Number(claimNode["@_num"]) || null,

    text: paragraph.text,

    paragraphs: [paragraph],

    references,

    dependentOn: dependentReference
      ? dependentReference.idref
      : null,
  };
}

/**
 * Extract all claims.
 */
export function extractClaims(root) {
  const claimsNode = get(root, "claims");

  if (!claimsNode) {
    return null;
  }

  const claims = toArray(
    get(claimsNode, "claim")
  )
    .map(parseClaim)
    .filter(Boolean);

  return {
    type: "claims",
    total: claims.length,
    claims,
  };
}

export default extractClaims;