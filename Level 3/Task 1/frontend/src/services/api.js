import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = (email, password) =>
  api.post("/api/auth/login", { email, password });

export const registerUser = (userData) =>
  api.post("/api/auth/register", userData);

export default api;
