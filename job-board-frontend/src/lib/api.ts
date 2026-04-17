import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('no refresh');
        const r = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh });
        localStorage.setItem('access_token', r.data.access);
        orig.headers.Authorization = `Bearer ${r.data.access}`;
        return api(orig);
      } catch {
        authService.logout();
        if (window.location.pathname !== '/login') window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth helpers ──
export interface UserData {
  id: number;
  username: string;
  email: string;
  role: 'job_seeker' | 'employer' | 'admin';
}

export const authService = {
  /** Store tokens + user data after login */
  setSession(access: string, refresh: string, user: UserData) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): UserData | null {
    try { return JSON.parse(localStorage.getItem('user') || ''); } catch { return null; }
  },

  getRole(): string | null {
    return this.getUser()?.role || null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
};
