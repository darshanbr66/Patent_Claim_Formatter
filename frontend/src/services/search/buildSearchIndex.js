/**
 * Builds a searchable index from the patent model.
 * This index is consumed by the search engine.
 */
export default function buildSearchIndex(document) {
  if (!document?.claims?.length) {
    return [];
  }

  return document.claims.map((claim) => {
    const header = claim.header ?? "";

    const elements = claim.elements ?? [];

    const body = elements
      .map((element) => element.text ?? "")
      .join("\n");

    /*
     * Build searchable text.
     * Include claim number and dependency information
     * so users can search by claim number.
     */
    const searchableText = [
      `claim ${claim.number}`,
      `${claim.number}`,
      claim.isIndependent
        ? "independent claim"
        : `depends on claim ${claim.dependentOn ?? ""}`,
      header,
      body,
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      id: claim.id,
      number: claim.number,
      claimType: claim.claimType,
      dependentOn: claim.dependentOn ?? null,

      header,
      body,

      text: searchableText,

      elements,

      originalClaim: claim,
    };
  });
}