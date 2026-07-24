import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ai-claim-parser.onrender.com",
  timeout: 60000,
  headers: {
    Accept: "application/json",
  },
});

export default apiClient;