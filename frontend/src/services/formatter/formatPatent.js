import { formatClaim } from "./formatClaim";
import formatDocument from "./formatDocument";
import formatStatistics from "./formatStatistics";

/**
 * Formats the complete patent into the UI model.
 *
 * This is the single entry point used by the viewer.
 */
export function formatPatent(patent) {
  if (!patent) {
    return null;
  }

  const claims = (
    Array.isArray(patent.claims)
      ? patent.claims
      : patent.claims?.claims ?? []
  )
    .map(formatClaim)
    .filter(Boolean);

  return {
    /*
     * Document
     */
    document: patent.document
      ? formatDocument(patent.document)
      : null,

    /*
     * Processing statistics
     *
     * The backend now already returns a formatted
     * statistics object, so reuse it directly.
     */
    statistics: patent.statistics ?? formatStatistics(patent),

    /*
     * Metadata
     */
    metadata: patent.metadata ?? {},

    /*
     * Other sections
     */
    parties: patent.parties ?? null,

    classifications:
      patent.classifications ?? null,

    relationships:
      patent.relationships ?? null,

    abstract: patent.abstract ?? null,

    description: patent.description ?? null,

    drawings: patent.drawings ?? null,

    /*
     * Claims
     */
    claims,
  };
}

export default formatPatent;