import formatDocument from "./formatDocument";
import formatStatistics from "./formatStatistics";
import formatClaim from "./formatClaim";

/**
 * Converts the backend API response into the frontend patent model.
 */
export default function formatBackendPatent(apiResponse) {
  if (!apiResponse || !Array.isArray(apiResponse.claims)) {
    throw new Error("Invalid backend response.");
  }

  return {
    document: formatDocument(apiResponse),

    statistics: formatStatistics(apiResponse),

    claims: apiResponse.claims.map(formatClaim),
  };
}