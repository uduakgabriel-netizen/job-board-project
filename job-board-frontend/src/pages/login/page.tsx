import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mimic API delay
    setTimeout(() => {
      setLoading(false);
      navigate('/');
      // Note: Toast message and real token storage would go here
    }, 1000);
  };

  return (
    <AuthLayout
      themeType="login"
      headline="Welcome Back!"
      subheadline="Sign in to continue your job search"
      testimonials={[
        { quote: "Jobberman-Lite helped me land a senior role at Paystack within just 2 weeks of actively applying. The interface is simply gorgeous.", author: "Jane A., Software Engineer" }
      ]}
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Sign In</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
            New here? <Link to="/register" className="text-sky-500 hover:text-sky-600 font-medium transition-colors">Create account →</Link>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username or Email</label>
            <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="jane@example.com" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors">Forgot Password?</Link>
            </div>
            <input required type="password" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="••••••••" />
          </div>

          <div className="flex items-center gap-2 pt-2 pb-4">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 transition-colors" />
            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">Remember Me</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Sign In'}
          </button>
        </form>

        <div className="relative mt-8 mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700/50 transition-colors duration-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors duration-300">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-pointer active:scale-95">
            <i className="ri-google-fill text-xl"></i> <span className="font-medium text-sm">Google</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-pointer active:scale-95">
            <i className="ri-linkedin-fill text-xl text-[#0A66C2]"></i> <span className="font-medium text-sm">LinkedIn</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
