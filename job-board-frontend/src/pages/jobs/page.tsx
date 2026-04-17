import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';
import { api, authService } from '../../lib/api';

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string | null;
  is_remote: boolean;
  created_at: string;
  company: number;
  company_name: string;
  category: number | null;
  employer: string;
}

export function JobsPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const user = authService.getUser();

  const fetchJobs = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { page: p };
      if (keyword) params.search = keyword;
      if (location) params.location = location;
      const res = await api.get('/jobs/', { params });
      setJobs(res.data.results || res.data);
      setTotalCount(res.data.count || (res.data.results || res.data).length);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      setPage(p);
    } catch {
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories/');
      setCategories(res.data.results || res.data);
    } catch { /* categories are optional */ }
  };

  useEffect(() => { fetchJobs(); fetchCategories(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(1);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={authService.isAuthenticated()} userType={user?.role || 'job_seeker'} />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-10 shadow-md shadow-slate-200/50 dark:shadow-none">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Find Jobs</h1>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus-within:border-sky-500">
                <i className="ri-search-line text-slate-400 mr-3"></i>
                <input type="text" placeholder="Job title, keywords, or company" className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200" value={keyword} onChange={e => setKeyword(e.target.value)} />
              </div>
              <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus-within:border-sky-500">
                <i className="ri-map-pin-2-line text-slate-400 mr-3"></i>
                <input type="text" placeholder="Location" className="w-full bg-transparent outline-none text-slate-700 dark:text-slate-200" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <button type="submit" className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-all cursor-pointer active:scale-95 shadow-md shadow-sky-500/20">Search</button>
            </form>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md shadow-slate-200/50 dark:shadow-none">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Categories</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setActiveCategory('All')} className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeCategory === 'All' ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>All Categories</button>
                  {categories.map((cat: any) => (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeCategory === cat.name ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{cat.name}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500 dark:text-slate-400 font-medium">Showing <span className="text-slate-900 dark:text-white">{totalCount}</span> jobs</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 animate-pulse">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
                  <i className="ri-error-warning-line text-4xl text-red-400 mb-4 block"></i>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
                  <button onClick={() => fetchJobs()} className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 cursor-pointer">Retry</button>
                </div>
              ) : jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {jobs.map(job => (
                    <Link key={job.id} to={`/jobs/${job.id}`} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-sky-300 dark:hover:border-sky-700 transition-all hover:shadow-lg hover:shadow-sky-500/5 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500 text-xl shrink-0"><i className="ri-briefcase-line"></i></div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors truncate">{job.title}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{job.company_name || 'Company'}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 flex items-center gap-1"><i className="ri-map-pin-2-line"></i> {job.location}</span>
                        {job.is_remote && <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-800/50">Remote</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{job.salary ? `₦${Number(job.salary).toLocaleString()}` : 'Negotiable'}</span>
                        <span className="text-xs text-slate-400">{timeAgo(job.created_at)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 text-3xl mb-4"><i className="ri-file-search-line"></i></div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Try adjusting your search criteria or check back later.</p>
                </div>
              )}

              {/* Pagination */}
              {(nextUrl || prevUrl) && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button disabled={!prevUrl} onClick={() => fetchJobs(page - 1)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">← Previous</button>
                  <span className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium">Page {page}</span>
                  <button disabled={!nextUrl} onClick={() => fetchJobs(page + 1)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
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
