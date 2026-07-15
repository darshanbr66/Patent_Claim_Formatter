/**
 * Generates a realistic backend-like response for the uploaded patent document.
 *
 * This module simulates the response that will eventually come from the
 * backend service. When backend integration is available, only the call
 * to this function should be replaced with an API request.
 */

function generateId(prefix = "DOC") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function createMockPatentResponse(file) {
  const processedAt = new Date().toISOString();

  const claims = [
    {
      id: generateId("CLM"),
      number: 1,
      text:
        "A computer-implemented method comprising: receiving a patent document; identifying one or more claims from the patent document; formatting the identified claims according to predefined formatting rules; and generating a formatted patent document for presentation.",
    },
    {
      id: generateId("CLM"),
      number: 2,
      text:
        "The method of claim 1, wherein the patent document comprises a USPTO XML patent grant document.",
    },
    {
      id: generateId("CLM"),
      number: 3,
      text:
        "The method of claim 1, wherein formatting preserves claim hierarchy, indentation, numbering, and dependency relationships.",
    },
    {
      id: generateId("CLM"),
      number: 4,
      text:
        "The method of claim 1, wherein the formatted document is configured for export as a printable PDF document.",
    },
  ];

  return {
    document: {
      id: generateId(),
      name: file.name,
      type: file.type || "application/xml",
      size: file.size,
      processedAt,
    },

    metadata: {
      status: "completed",
      processingTime: "1.2s",
      formatterVersion: "1.0.0",
      totalClaims: claims.length,
    },

    claims,
  };
}