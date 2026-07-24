export default function formatStatistics(apiResponse) {
  return {
    claimCount: apiResponse.claim_count ?? 0,

    independentClaims:
      apiResponse.independent_claims ?? 0,

    dependentClaims:
      apiResponse.dependent_claims ?? 0,

    confidence:
      apiResponse.confidence ?? null,

    processingTime:
      apiResponse.processing_time_ms ?? null,

    ocrUsed:
      apiResponse.ocr_used ?? false,

    pdfGenerated:
      apiResponse.pdf_generated ?? false,

    downloadUrl:
      apiResponse.download_url ?? null,

    downloadEndpoint:
      apiResponse.download_endpoint ?? null,

    pdfUrl:
      apiResponse.pdf_url ?? null,

    jsonUrl:
      apiResponse.json_url ?? null,
  };
}