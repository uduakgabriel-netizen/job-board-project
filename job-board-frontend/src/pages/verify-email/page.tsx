import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResendCount(c => c + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 dark:bg-sky-900/20 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 cursor-pointer active:scale-95"
        >
          <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
        </button>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 sm:p-12 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300 text-center">
          
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-sky-100 dark:bg-sky-900/30 rounded-full animate-ping opacity-70"></div>
            <div className="relative w-full h-full bg-sky-50 dark:bg-sky-900/40 border border-sky-100 dark:border-sky-800 rounded-full flex items-center justify-center text-5xl text-sky-500 shadow-lg shadow-sky-500/20">
              <i className="ri-mail-check-line z-10"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300 mb-4">
            Verify Your Email
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300 mb-8 max-w-sm mx-auto">
            We sent a verification link to <span className="font-semibold text-slate-800 dark:text-slate-200">user@example.com</span>. Please check your inbox and click the link to activate your account.
          </p>

          <div className="space-y-4">
             {resendCount > 0 && (
               <div className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 py-2 px-4 rounded-lg inline-flex items-center gap-2 font-medium mb-4">
                 <i className="ri-check-line"></i> Verification email resent {resendCount > 1 ? `(${resendCount} times)` : ''}
               </div>
             )}

             <button 
               onClick={() => window.open('https://gmail.com', '_blank')}
               className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 text-lg"
             >
               Open Email App
             </button>

             <button 
               onClick={handleResend}
               disabled={loading}
               className="w-full py-4 rounded-xl bg-white/80 dark:bg-slate-700/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-wait"
             >
               {loading ? <span className="flex items-center justify-center gap-2"><i className="ri-loader-4-line animate-spin"></i> Resending...</span> : "Didn't receive email? Resend"}
             </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700/50">
             <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 font-medium transition-colors text-sm inline-flex items-center gap-1">
               <i className="ri-arrow-left-line"></i> Back to Home
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
