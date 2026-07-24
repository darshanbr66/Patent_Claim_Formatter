export default function formatDocument(apiResponse) {
  return {
    type: apiResponse.document_type ?? null,
    status: apiResponse.status ?? null,

    title: apiResponse.metadata?.title ?? null,

    country: apiResponse.metadata?.country ?? null,

    patentNumber:
      apiResponse.metadata?.patent_number ?? null,

    publicationNumber:
      apiResponse.metadata?.publication_number ?? null,

    publicationDate:
      apiResponse.metadata?.publication_date ?? null,

    applicationNumber:
      apiResponse.metadata?.application_number ?? null,

    applicationDate:
      apiResponse.metadata?.application_date ?? null,

    kind:
      apiResponse.metadata?.kind_code ?? null,

    language:
      apiResponse.metadata?.language ?? "en",
  };
}