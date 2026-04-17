import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { api, authService } from '../../lib/api';

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Use the custom LoginView which returns user object with role
      const res = await api.post('/auth/login/', { username, password });
      const { access, refresh, user } = res.data;
      authService.setSession(access, refresh, user);

      if (user.role === 'employer') navigate('/dashboard/employer');
      else navigate('/dashboard/job-seeker');
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout themeType="login" headline="Welcome Back!" subheadline="Sign in to continue your job search"
      testimonials={[{ quote: "Job-Board helped me land a senior role at Paystack within just 2 weeks of actively applying. The interface is simply gorgeous.", author: "Jane A., Software Engineer" }]}>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Sign In</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">New here? <Link to="/register" className="text-sky-500 hover:text-sky-600 font-medium">Create account →</Link></p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0"><i className="ri-error-warning-line font-bold"></i></div>
            <div><h4 className="font-bold text-sm">Login Failed</h4><p className="text-xs opacity-90">{error}</p></div>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="johndoe" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-sky-500 hover:text-sky-600">Forgot Password?</Link>
            </div>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="••••••••" />
          </div>
          <div className="flex items-center gap-2 pt-2 pb-4">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">Remember Me</label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Sign In'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
