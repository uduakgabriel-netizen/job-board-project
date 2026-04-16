import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Simple password strength calculation based on length/requirements
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 33;
    if (/[A-Z]/.test(password)) score += 33;
    if (/[0-9]/.test(password)) score += 34;
    return score;
  };
  const strength = getStrength();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="text-rose-500 text-5xl mb-4"><i className="ri-error-warning-line"></i></div>
          <h1 className="text-2xl font-bold dark:text-white mb-2">Invalid Token</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">The password reset link is invalid or has expired.</p>
          <button onClick={() => navigate('/forgot-password')} className="w-full py-3 bg-sky-500 text-white rounded-xl font-medium cursor-pointer">
            Request New Link
          </button>
        </div>
      </div>
    );
  }

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
            <i className="ri-lock-password-line"></i>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300 mb-2">
            Create New Password
          </h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300 mb-8">
            Your new password must be different from previous used passwords.
          </p>

          <form onSubmit={handleReset} className="text-left space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="••••••••" 
              />
              {/* Strength Indicator */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <div 
                      className={`h-full transition-all duration-300 ${strength < 50 ? 'bg-rose-500' : strength < 100 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {strength < 50 ? 'Weak' : strength < 100 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
              <input required type="password" minLength={8} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="••••••••" />
            </div>

            <button 
              type="submit" 
              disabled={loading || strength < 100}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
