import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { JobCard } from '../home/components/JobCard';
import { mockJobs, mockCategories } from '../../mocks/jobs';

export function JobsPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Simple placeholder filtering logic
  const filteredJobs = mockJobs.filter(job => {
    let match = true;
    if (activeCategory !== 'All' && !job.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase())) {
      // Very basic category match
      // match = false;
    }
    if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) && !job.company.toLowerCase().includes(keyword.toLowerCase())) {
      match = false;
    }
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      match = false;
    }
    return match;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={true} userType="job_seeker" />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header & Search */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-10 transition-colors duration-300 shadow-md shadow-slate-200/50 dark:shadow-none">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Find Jobs</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus-within:border-sky-500 transition-colors duration-300">
                <i className="ri-search-line text-slate-400 mr-3"></i>
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus-within:border-sky-500 transition-colors duration-300">
                <i className="ri-map-pin-2-line text-slate-400 mr-3"></i>
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 shadow-md shadow-sky-500/20">
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-colors duration-300 shadow-md shadow-slate-200/50 dark:shadow-none">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Categories</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      activeCategory === 'All' 
                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {mockCategories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer flex items-center justify-between ${
                        activeCategory === cat.name 
                          ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2"><i className={cat.icon}></i> {cat.name}</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  Showing <span className="text-slate-900 dark:text-white">{filteredJobs.length}</span> jobs
                </p>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-100 dark:border-slate-700/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors duration-300">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 text-3xl mb-4">
                    <i className="ri-file-search-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Try adjusting your search criteria or removing filters.</p>
                </div>
              )}

              {/* Pagination */}
              {filteredJobs.length > 0 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer active:scale-95">
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-sky-500 bg-sky-500 text-white font-medium cursor-pointer">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer active:scale-95">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer active:scale-95">
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
