import apiClient from "./apiClient";

/**
 * Parse a patent document.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
export async function parsePatent(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiClient.post(
    "/api/v1/parse",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}


/**
 * Parse patent document and download generated PDF.
 *
 * @param {File} file
 * @returns {Promise<AxiosResponse<Blob>>}
 */
export async function downloadPatentPdf(file) {
  const formData = new FormData();

  formData.append("file", file);

  return apiClient.post(
    "/api/v1/parse/pdf",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );
}


/**
 * Health check.
 *
 * @returns {Promise<Object>}
 */
export async function healthCheck() {
  const response = await apiClient.get("/api/v1/health");

  return response.data;
}