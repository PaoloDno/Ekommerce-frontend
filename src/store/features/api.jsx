import axios from "axios";
import store from "../Store";
import { setError, clearError } from "../reducers/ErrorSlice";

export const api = axios.create({
  baseURL: "http://localhost:5000/kommerce",
  headers: {
    "Content-Type": "application/json",
  },
});

{/* api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}); */}

function handleAuthError() {
  localStorage.removeItem("token");
  localStorage.removeItem("app_state");
  window.location.href = "/token-error";
}


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;

    // Dispatch error to Redux
    store.dispatch(setError({ status, message }));

    // Optional: centralized logging (easy to toggle)
    if (LOG_ERRORS) {
      console.error(`API Error [${status || "??"}]:`, message);
    }

    // Auth-related redirects (same as before)
    if (
      (status === 401 &&
        [
          "Access denied. No token provided.",
          "Invalid token. Please log in again.",
          "Invalid token. Access denied.",
        ].includes(message)) ||
      (status === 403 && ["Access denied. No token provided."].includes(message))
    ) {
      handleAuthError();
    } else if (status === 404 && message === "User not found.") {
      handleAuthError();
    } else if (status === 500) {
      console.error("Internal Server Error:", message);
      handleAuthError();
    }

    return Promise.reject(error);
  }
);