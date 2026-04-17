import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword || location) {
      navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
    }
  };

  const handleTagClick = (tag: string) => {
    navigate(`/jobs?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-white dark:bg-slate-950 px-6 pt-24 pb-12 overflow-hidden transition-colors duration-300">
      {/* Professional Cinematic Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src="/img1.jpg" 
          alt="Professional Team" 
          className="w-full h-full object-cover opacity-25 dark:opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 p-8 md:p-14 rounded-[3rem] shadow-2xl">

        {/* H1 */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
          Find Your{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-400 pb-2">
            Dream Job
            <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 to-blue-400 rounded-full opacity-50"></span>
          </span>
          <br className="hidden md:block" /> in Nigeria
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto transition-colors duration-300">
          Discover thousands of job opportunities matching your skills. Connect with top employers and take the next leap in your career.
        </p>

        {/* Search Container */}
        <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-2xl p-2 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          <form className="flex flex-col md:flex-row items-center gap-2" onSubmit={handleSearch}>
            <div className="flex-1 flex items-center w-full bg-white dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-800 focus-within:border-sky-300 transition-colors duration-300">
              <i className="ri-search-line text-slate-400 text-xl mr-3"></i>
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <div className="flex-1 flex items-center w-full bg-white dark:bg-slate-900 rounded-xl px-4 py-3 border border-slate-100 dark:border-slate-800 focus-within:border-sky-300 transition-colors duration-300">
              <i className="ri-map-pin-2-line text-slate-400 text-xl mr-3"></i>
              <input 
                type="text" 
                placeholder="City, state, or 'Remote'" 
                className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 shadow-md shadow-sky-500/20"
            >
              Search Jobs
            </button>
          </form>
        </div>

        {/* Trending Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2 transition-colors duration-300">Trending:</span>
          {['Remote', 'React Developer', 'Product Manager', 'Data Analyst'].map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/100 dark:from-slate-900/100 to-transparent pointer-events-none transition-colors duration-300" />
    </section>
  );
}
