import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      // Wait 5 seconds to redirect to login would be here
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 dark:bg-sky-900/20 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 dark:bg-indigo-900/20 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 cursor-pointer active:scale-95"
        >
          <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300 text-center">
          
          <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-4xl text-sky-500 mx-auto mb-6 shadow-sm">
            <i className={sent ? "ri-mail-send-line" : "ri-mail-lock-line"}></i>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 mb-2">
            {sent ? "Check your email" : "Forgot Password?"}
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300 mb-8">
            {sent 
              ? "We've sent password reset instructions to your email address." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>

          {!sent ? (
            <form onSubmit={handleReset} className="text-left space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input required type="email" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="jane@example.com" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <Link to="/login" className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center mt-4">
              Back to Sign In
            </Link>
          )}

          {!sent && (
            <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-700/50 pt-6">
               <Link to="/login" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 font-medium transition-colors text-sm inline-flex items-center gap-1">
                 <i className="ri-arrow-left-line"></i> Back to sign in
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
