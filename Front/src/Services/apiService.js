// api.js
import axios from "axios";

const API_URL = "https://jdservice.cl/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
