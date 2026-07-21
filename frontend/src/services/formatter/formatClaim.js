import { formatParagraph } from "./formatParagraph";

/**
 * Format parsed claim for renderer.
 */
export function formatClaim(claim) {
  if (!claim) {
    return null;
  }

  const paragraphs = (claim.paragraphs ?? [])
    .map(formatParagraph)
    .filter(Boolean);

  return {
    type: "claim",

    id: claim.id,

    number: claim.number,

    dependentOn: claim.dependentOn,

    isIndependent: claim.dependentOn == null,

    // Existing structure (keep for compatibility)
    paragraphs,

    // New semantic structure
    leadIn: paragraphs[0] ?? null,

    limitations: paragraphs.slice(1),

    references: claim.references ?? [],
  };
}

export default formatClaim;