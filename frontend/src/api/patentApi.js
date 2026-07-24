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
 * Health check.
 *
 * @returns {Promise<Object>}
 */
export async function healthCheck() {
  const response = await apiClient.get("/api/v1/health");

  return response.data;
}