import { formatParagraph } from "./formatParagraph";

/**
 * Formats a claim for the renderer.
 *
 * Supports:
 * - Legacy XML parser
 * - New backend API
 */
export function formatClaim(claim) {
  if (!claim) {
    return null;
  }

  /*
   * -----------------------------
   * Backend claim
   * -----------------------------
   */
  if (Array.isArray(claim.elements)) {
    const dependentOn =
      claim.dependentOn ??
      claim.parentClaim ??
      claim.parent_claim ??
      null;

    const claimType =
      claim.claimType ??
      claim.claim_type ??
      null;

    const isIndependent =
      claimType
        ? claimType === "INDEPENDENT"
        : dependentOn == null;

    return {
      type: "claim",

      id: claim.id,

      number: claim.number,

      claimType,

      dependentOn,

      isIndependent,

      /*
       * Backend renderer
       */
      header: claim.header ?? null,

      elements: claim.elements ?? [],

      /*
       * Keep compatibility with existing code
       */
      paragraphs: [],

      leadIn: null,

      limitations: [],

      references: claim.references ?? [],

      metadata: claim.metadata ?? {},
    };
  }

  /*
   * -----------------------------
   * Legacy parser
   * -----------------------------
   */

  const paragraphs = (claim.paragraphs ?? [])
    .map(formatParagraph)
    .filter(Boolean);

  const dependentOn =
    claim.dependentOn ??
    claim.parentClaim ??
    claim.parent_claim ??
    null;

  const claimType =
    claim.claimType ??
    claim.claim_type ??
    null;

  const isIndependent =
    claimType
      ? claimType === "INDEPENDENT"
      : dependentOn == null;

  return {
    type: "claim",

    id: claim.id,

    number: claim.number,

    claimType,

    dependentOn,

    isIndependent,

    paragraphs,

    leadIn: paragraphs[0] ?? null,

    limitations: paragraphs.slice(1),

    references: claim.references ?? [],

    metadata: claim.metadata ?? {},
  };
}

export default formatClaim;