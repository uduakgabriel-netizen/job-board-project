import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface NavbarProps {
  isAuthenticated?: boolean;
  userType?: 'job_seeker' | 'employer' | null;
}

export function Navbar({ isAuthenticated = false, userType = null }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="px-6 md:px-12 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer transition-all duration-300 active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            J
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white transition-colors duration-300">
            Jobberman<span className="text-sky-500">-Lite</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/jobs" className="text-slate-500 dark:text-slate-400 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Browse Jobs
          </Link>
          <Link to="/companies" className="text-slate-500 dark:text-slate-400 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Companies
          </Link>
          <Link to="/pricing" className="text-slate-500 dark:text-slate-400 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Pricing
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer active:scale-95"
            aria-label="Toggle Theme"
          >
            <i className={theme === 'dark' ? 'ri-sun-line text-lg' : 'ri-moon-line text-lg'}></i>
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-2">
              <Link to={`/dashboard/${userType === 'employer' ? 'employer' : 'job-seeker'}`} className="text-slate-700 dark:text-slate-300 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                Dashboard
              </Link>
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500 font-bold overflow-hidden text-sm">
                    {userType === 'employer' ? <i className="ri-building-4-line"></i> : <i className="ri-user-line"></i>}
                  </div>
                  <i className="ri-arrow-down-s-line text-slate-500"></i>
                </div>
                {/* Simple dropdown mock */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <Link to={userType === 'employer' ? "/employer/profile" : "/settings/profile"} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                    Profile Settings
                  </Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-slate-900 dark:text-white font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer whitespace-nowrap active:scale-95">
                Sign In
              </Link>
              <Link to="/register" className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer whitespace-nowrap active:scale-95">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-900 dark:text-white text-2xl cursor-pointer transition-all duration-300 active:scale-95"
          >
            <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-5 flex flex-col gap-4 shadow-lg md:hidden animate-fade-in transition-all duration-300">
          <Link to="/jobs" className="text-slate-500 dark:text-slate-400 font-medium py-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Browse Jobs
          </Link>
          <Link to="/companies" className="text-slate-500 dark:text-slate-400 font-medium py-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Companies
          </Link>
          <Link to="/pricing" className="text-slate-500 dark:text-slate-400 font-medium py-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
            Pricing
          </Link>
          <hr className="border-slate-100 dark:border-slate-700/50 transition-colors duration-300" />
          {isAuthenticated ? (
            <>
              <Link to={`/dashboard/${userType === 'employer' ? 'employer' : 'job-seeker'}`} className="text-sky-500 font-medium py-2">
                Dashboard
              </Link>
              <Link to={userType === 'employer' ? "/employer/profile" : "/settings/profile"} className="text-slate-500 dark:text-slate-400 font-medium py-2">
                Profile Settings
              </Link>
              <Link to="/logout" className="text-rose-500 font-medium py-2">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-900 dark:text-white font-medium py-2 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                Sign In
              </Link>
              <Link to="/register" className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium text-center transition-all duration-300 cursor-pointer active:scale-95">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
