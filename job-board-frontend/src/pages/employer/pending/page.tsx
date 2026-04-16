import { Link } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';

export function EmployerPendingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Ornaments suitable for Employer */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/30 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-900/20 blur-3xl rounded-full absolute pointer-events-none transition-colors duration-300" />
      
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-lg border border-slate-700 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm text-slate-400 hover:text-sky-400 transition-all duration-300 cursor-pointer active:scale-95"
        >
          <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
        </button>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 p-8 sm:p-12 rounded-3xl shadow-2xl transition-colors duration-300 text-center">
          
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-slate-900/80 border border-indigo-500/30 rounded-full flex items-center justify-center text-5xl text-indigo-400 shadow-[0_0_30px_10px_rgba(99,102,241,0.1)]">
              <i className="ri-time-line z-10"></i>
            </div>
          </div>

          <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-semibold mb-4">PENDING APPROVAL</div>

          <h1 className="text-3xl font-bold text-white transition-colors duration-300 mb-4">
            Application Under Review
          </h1>
          
          <p className="text-lg text-slate-400 transition-colors duration-300 mb-8 max-w-sm mx-auto">
            Thank you for registering. We're currently verifying your company information to ensure platform quality.
          </p>

          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 mb-8 text-left">
             <div className="flex items-center gap-3 mb-2 text-slate-300 font-medium">
               <i className="ri-calendar-check-line text-indigo-400 text-xl"></i> Timeline
             </div>
             <p className="text-slate-400 text-sm ml-8">This verification process usually takes 1-2 business days. We will notify you via email once approved.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
               <i className="ri-megaphone-line text-sky-400 mb-2 block text-xl"></i>
               <h4 className="text-white text-sm font-semibold mb-1">Post Jobs</h4>
               <p className="text-slate-500 text-xs">Instantly publish opportunities.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
               <i className="ri-radar-line text-emerald-400 mb-2 block text-xl"></i>
               <h4 className="text-white text-sm font-semibold mb-1">Source Talent</h4>
               <p className="text-slate-500 text-xs">Browse the rich CV database.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <Link 
               to="/"
               className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md flex items-center justify-center"
             >
               Explore Jobs Meanwhile
             </Link>
             <a 
               href="mailto:support@jobberman-lite.com"
               className="w-full py-3.5 rounded-xl border border-slate-600 hover:bg-slate-700 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
             >
               <i className="ri-customer-service-2-line"></i> Support
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
