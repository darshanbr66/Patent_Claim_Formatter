import { formatClaim } from "./formatClaim";

/**
 * Format the parsed patent into a renderer-friendly document.
 */
export function formatPatent(patent) {
  if (!patent) {
    return null;
  }

  return {
    document: patent.document ?? null,

    parties: patent.parties ?? null,

    classifications: patent.classifications ?? null,

    relationships: patent.relationships ?? null,

    abstract: patent.abstract ?? null,

    description: patent.description ?? null,

    drawings: patent.drawings ?? null,

    claims: (patent.claims?.claims ?? [])
      .map(formatClaim)
      .filter(Boolean),
  };
}

export default formatPatent;