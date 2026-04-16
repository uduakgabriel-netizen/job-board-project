import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout';

export function RegisterJobSeekerPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding/job-seeker');
    }, 1500);
  };

  return (
    <AuthLayout
      themeType="job-seeker"
      headline="Start Your Career Journey"
      subheadline="Join thousands of job seekers finding their dream jobs"
      features={[
        "Apply to top companies instantly",
        "Get tailored job alerts",
        "Track your applications completely"
      ]}
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Create an account</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">
            Already have an account? <Link to="/login" className="text-sky-500 hover:text-sky-600 font-medium transition-colors">Sign In →</Link>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <input required type="email" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
            <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="janedoe" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <input required type={showPassword ? 'text' : 'password'} minLength={8} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
              <input required type="password" minLength={8} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="••••••••" />
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 !mt-1">Must be at least 8 characters, 1 uppercase, 1 number.</p>

          <div className="flex items-start gap-2 pt-2">
            <input required type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded border-slate-300 text-sky-500 focus:ring-sky-500 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 transition-colors cursor-pointer" />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer leading-tight">
              I agree to the <Link to="#" className="text-sky-500 hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-sky-500 hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 mt-6 flex items-center justify-center gap-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Sign Up'}
          </button>
        </form>

        <div className="relative mt-6 mb-6">
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

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-8">
          By signing up, you agree to our Terms in full accordance.
        </p>
      </div>
    </AuthLayout>
  );
}
