import axios, { AxiosError } from "axios";
import { authStore } from "store/authStore";

const API_BASE = process.env.REACT_APP_API_URL ?? "http://localhost:3000/api";
const AUTH_SCHEME = "Token";

export class ApiError extends Error {
  constructor(public status: number, public body: unknown) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

function clearSession(): void {
  authStore.removeToken();
  if (window.location.hash !== "#/login") {
    window.location.hash = "#/login";
  }
}

api.interceptors.request.use(config => {
  const token = authStore.readToken();

  if (token) {
    config.headers.Authorization = `${AUTH_SCHEME} ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status ?? 0;
    const body = error.response?.data ?? null;

    if (status === 401) {
      clearSession();
    }

    return Promise.reject(new ApiError(status, body));
  }
);
