import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobCard } from './JobCard';
import { mockJobs } from '../../../mocks/jobs';

export function LatestJobs() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4 transition-colors duration-300">
              <i className="ri-fire-line"></i> Latest
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Recommended Jobs
            </h2>
          </div>
          
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-slate-500 dark:text-slate-400 max-w-md transition-colors duration-300 md:text-right">
              Based on your profile and search history. Apply to these roles today.
            </p>
            <button 
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 text-sky-500 font-medium hover:text-sky-600 transition-colors duration-300 group whitespace-nowrap cursor-pointer active:scale-95"
            >
              View All Jobs <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col h-full animate-pulse transition-colors duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                </div>
                <div className="w-3/4 h-6 rounded bg-slate-200 dark:bg-slate-700 mb-4"></div>
                <div className="w-1/2 h-4 rounded bg-slate-200 dark:bg-slate-700 mb-2"></div>
                <div className="w-2/3 h-4 rounded bg-slate-200 dark:bg-slate-700 mb-6"></div>
                <div className="flex gap-2 mb-6">
                  <div className="w-16 h-6 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-16 h-6 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between">
                  <div className="w-24 h-5 rounded bg-slate-200 dark:bg-slate-700"></div>
                  <div className="w-20 h-4 rounded bg-slate-200 dark:bg-slate-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : mockJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors duration-300">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-3xl mb-4 transition-colors duration-300">
              <i className="ri-search-2-line"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">No jobs found</h3>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">
              We couldn't find any jobs matching your criteria right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
