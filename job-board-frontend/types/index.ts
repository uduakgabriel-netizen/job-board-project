// ── User ──────────────────────────────────────────────────────
export type UserRole = "job_seeker" | "employer" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// ── Company ───────────────────────────────────────────────────
export interface Company {
  id: number;
  owner: number;
  name: string;
  description: string;
  website: string | null;
  location: string | null;
}

// ── Category ──────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
}

// ── Job ───────────────────────────────────────────────────────
export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number | null;
  is_remote: boolean;
  is_approved: boolean;
  is_live: boolean;
  created_at: string;
  company: number;
  company_name: string;
  category: number | null;
  employer: string;
}

export interface JobCreateData {
  title: string;
  description: string;
  location: string;
  salary?: number | null;
  is_remote?: boolean;
  category?: number | null;
  company?: number;
}

// ── Application ───────────────────────────────────────────────
export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface Application {
  id: number;
  job: number;
  job_title: string;
  applicant: string;
  cover_letter: string;
  resume: string | null;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
}

// ── Paginated Response ────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
