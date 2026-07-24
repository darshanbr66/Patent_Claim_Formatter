/**
 * Formats processing statistics returned by the backend.
 */
export default function formatStatistics(document = {}) {
  return {
    claimCount: document.claim_count ?? 0,

    independentClaims:
      document.independent_claims ?? 0,

    dependentClaims:
      document.dependent_claims ?? 0,

    confidence:
      document.confidence ?? null,

    processingTime:
      document.processing_time_ms ?? null,

    ocrUsed:
      document.ocr_used ?? false,

    pdfGenerated:
      document.pdf_generated ?? false,

    downloadUrl:
      document.download_url ?? null,

    downloadEndpoint:
      document.download_endpoint ?? null,

    pdfUrl:
      document.pdf_url ?? null,

    jsonUrl:
      document.json_url ?? null,
  };
}