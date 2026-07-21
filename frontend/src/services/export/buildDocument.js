import { Document } from "docx";

import buildHeader from "./buildHeader";
import buildMetadata from "./buildMetadata";
import buildClaims from "./buildClaims";

/**
 * Build the complete DOCX document.
 *
 * @param {object} patent
 * @returns {Document}
 */
export function buildDocument(patent) {
  if (!patent) {
    throw new Error("Patent document is required.");
  }

  return new Document({
    creator: "Patent Claim Formatter",
    title: patent.document?.title ?? "Patent",
    description: "Formatted patent claims",

    sections: [
      {
        properties: {},

        children: [
          ...buildHeader(patent.document),
          ...buildMetadata(patent.document),
          ...buildClaims(patent.claims),
        ],
      },
    ],
  });
}

export default buildDocument;