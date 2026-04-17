import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout';
import { api, authService } from '../../../lib/api';

export function RegisterJobSeekerPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError(null);

    const nameParts = fullName.trim().split(' ');
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';

    try {
      // 1. Register the user
      await api.post('/auth/register/', { username, email, password, first_name, last_name });

      // 2. Auto-login with the same credentials
      const loginRes = await api.post('/auth/login/', { username, password });
      const { access, refresh, user } = loginRes.data;
      authService.setSession(access, refresh, user);

      navigate('/onboarding/job-seeker');
    } catch (err: any) {
      const data = err.response?.data;
      if (data) {
        const msg = typeof data === 'string' ? data
          : data.username ? `Username: ${data.username[0]}`
          : data.email ? `Email: ${data.email[0]}`
          : data.password ? `Password: ${data.password[0]}`
          : data.detail || 'Registration failed. Please try again.';
        setError(msg);
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout themeType="job-seeker" headline="Start Your Career Journey" subheadline="Join thousands of job seekers finding their dream jobs"
      features={["Apply to top companies instantly", "Get tailored job alerts", "Track your applications completely"]}>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Create an account</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Already have an account? <Link to="/login" className="text-sky-500 hover:text-sky-600 font-medium">Sign In →</Link></p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400 text-sm flex items-center gap-2">
            <i className="ri-error-warning-line"></i> {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="janedoe" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <input required type={showPassword ? 'text' : 'password'} minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"><i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i></button>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
              <input required type="password" minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="••••••••" />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 !mt-1">Must be at least 8 characters, 1 uppercase, 1 number.</p>

          <div className="flex items-start gap-2 pt-2">
            <input required type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-slate-300 text-sky-500 focus:ring-sky-500 cursor-pointer" />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer leading-tight">
              I agree to the <Link to="#" className="text-sky-500 hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-sky-500 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 mt-6 flex items-center justify-center gap-2">
            {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Sign Up'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
