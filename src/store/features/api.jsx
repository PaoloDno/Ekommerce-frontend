import axios from "axios";
import store from "../Store";
import { setError, clearError } from "../reducers/ErrorSlice";

export const api = axios.create({
  baseURL: "http://localhost:5000/kommerce",
  headers: {
    "Content-Type": "application/json",
  },
});

{
  /* api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}); */
}

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
    if (typeof LOG_ERRORS !== "undefined" && LOG_ERRORS) {
      console.error(`API Error [${status || "??"}]:`, message);
    }

    // Auth-related redirects (same as before)
    const lowerMsg = (message || "").toLowerCase();
    if (
      status === 401 &&
      (lowerMsg.includes("token") || lowerMsg.includes("access denied"))
    ) {
      handleAuthError();
    }

    return Promise.reject(error);
  }
);
