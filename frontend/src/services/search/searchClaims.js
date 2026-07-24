/**
 * Searches the patent search index.
 *
 * Rules:
 * - Numeric query ("9", "10") -> search claim numbers only.
 * - Text query ("motor", "shaft") -> search full claim text.
 */
export default function searchClaims(searchIndex, query) {
  const term = query.trim().toLowerCase();

  if (!term || !Array.isArray(searchIndex)) {
    return [];
  }

  // --------------------------------------------------
  // Numeric Search (Claim Number)
  // --------------------------------------------------
  if (/^\d+$/.test(term)) {
    return searchIndex
      .filter((claim) => String(claim.number) === term)
      .map((claim) => ({
        claimId: claim.id,
        claimNumber: claim.number,
        claimType: claim.claimType,
        dependentOn: claim.dependentOn,

        text: claim.text,

        matchCount: 1,
        firstMatch: 0,

        positions: [],
      }))
      .sort((a, b) => a.claimNumber - b.claimNumber);
  }

  // --------------------------------------------------
  // Full Text Search
  // --------------------------------------------------
  return searchIndex
    .map((claim) => {
      const text = claim.text.toLowerCase();

      const positions = [];
      let startIndex = 0;

      while (true) {
        const matchIndex = text.indexOf(term, startIndex);

        if (matchIndex === -1) {
          break;
        }

        positions.push({
          start: matchIndex,
          end: matchIndex + term.length,
          value: claim.text.slice(
            matchIndex,
            matchIndex + term.length
          ),
        });

        startIndex = matchIndex + term.length;
      }

      if (!positions.length) {
        return null;
      }

      return {
        claimId: claim.id,
        claimNumber: claim.number,
        claimType: claim.claimType,
        dependentOn: claim.dependentOn,

        text: claim.text,

        matchCount: positions.length,
        firstMatch: positions[0].start,

        positions,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) {
        return b.matchCount - a.matchCount;
      }

      return a.claimNumber - b.claimNumber;
    });
}