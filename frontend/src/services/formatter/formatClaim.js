import { formatParagraph } from "./formatParagraph";

/**
 * Format parsed claim for renderer.
 */
export function formatClaim(claim) {
  if (!claim) {
    return null;
  }

  return {
    type: "claim",

    id: claim.id,

    number: claim.number,

    dependentOn: claim.dependentOn,

    isIndependent: claim.dependentOn == null,

    paragraphs: (claim.paragraphs ?? [])
      .map(formatParagraph)
      .filter(Boolean),

    references: claim.references ?? [],
  };
}

export default formatClaim;