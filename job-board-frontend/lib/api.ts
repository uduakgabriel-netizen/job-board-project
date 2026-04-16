import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor — attach JWT ──────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Response interceptor — auto‑refresh on 401 ───────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          try {
            const { data } = await axios.post(
              `${API_BASE_URL.replace("/api", "")}/api/token/refresh/`,
              { refresh }
            );
            localStorage.setItem("access_token", data.access);
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return api(originalRequest);
          } catch {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

/* ────────────────────────────────────────────────────────────────
   API service functions — mirrors every Django endpoint exactly
   ──────────────────────────────────────────────────────────────── */

import type {
  User,
  LoginResponse,
  RegisterData,
  Job,
  JobCreateData,
  Application,
  Company,
  Category,
  PaginatedResponse,
} from "@/types";

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>("/auth/login/", { username, password }),

  register: (data: RegisterData) =>
    api.post("/auth/register/", data),

  registerEmployer: (data: RegisterData) =>
    api.post("/auth/register/employer/", data),

  logout: (refresh: string) =>
    api.post("/auth/logout/", { refresh }),

  getProfile: () => api.get<User>("/auth/profile/"),

  updateProfile: (data: Partial<User>) =>
    api.put("/auth/profile/", data),
};

// ── Token (SimpleJWT) ─────────────────────────────────────────
export const tokenAPI = {
  obtain: (username: string, password: string) =>
    axios.post(`${API_BASE_URL.replace("/api", "")}/api/token/`, {
      username,
      password,
    }),
  refresh: (refresh: string) =>
    axios.post(`${API_BASE_URL.replace("/api", "")}/api/token/refresh/`, {
      refresh,
    }),
};

// ── Jobs ──────────────────────────────────────────────────────
export const jobsAPI = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<PaginatedResponse<Job>>("/jobs/", { params }),

  getById: (id: number) => api.get<Job>(`/jobs/${id}/`),

  create: (data: JobCreateData) => api.post<Job>("/jobs/", data),

  update: (id: number, data: Partial<JobCreateData>) =>
    api.patch<Job>(`/jobs/${id}/`, data),

  delete: (id: number) => api.delete(`/jobs/${id}/`),
};

// ── Applications ──────────────────────────────────────────────
export const applicationsAPI = {
  getAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Application>>("/applications/", { params }),

  create: (data: FormData) =>
    api.post<Application>("/applications/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateStatus: (id: number, status: string) =>
    api.patch<Application>(`/applications/${id}/`, { status }),

  delete: (id: number) => api.delete(`/applications/${id}/`),
};

// ── Companies ─────────────────────────────────────────────────
export const companiesAPI = {
  getAll: () => api.get<PaginatedResponse<Company>>("/companies/"),

  getById: (id: number) => api.get<Company>(`/companies/${id}/`),

  create: (data: Partial<Company>) => api.post<Company>("/companies/", data),

  update: (id: number, data: Partial<Company>) =>
    api.patch<Company>(`/companies/${id}/`, data),
};

// ── Categories ────────────────────────────────────────────────
export const categoriesAPI = {
  getAll: () => api.get<PaginatedResponse<Category>>("/categories/"),
};
