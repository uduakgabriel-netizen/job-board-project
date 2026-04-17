import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';
import { api, authService } from '../../../lib/api';

export function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = authService.getUser();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${id}/`);
        setJob(res.data);
      } catch {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days} days ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
        <Navbar isAuthenticated={authService.isAuthenticated()} userType={user?.role || 'job_seeker'} />
        <main className="flex-1 pt-24 pb-20 max-w-6xl mx-auto px-6 w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-8"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
        <Navbar isAuthenticated={authService.isAuthenticated()} userType={user?.role || 'job_seeker'} />
        <main className="flex-1 pt-24 pb-20 max-w-6xl mx-auto px-6 w-full flex items-center justify-center">
          <div className="text-center">
            <i className="ri-error-warning-line text-5xl text-red-400 mb-4 block"></i>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Job Not Found</h2>
            <p className="text-slate-500 mb-6">{error || 'This job listing may have been removed.'}</p>
            <button onClick={() => navigate('/jobs')} className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 cursor-pointer">Browse Jobs</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={authService.isAuthenticated()} userType={user?.role || 'job_seeker'} />
      <main className="flex-1 pt-24 pb-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <button onClick={() => navigate('/jobs')} className="flex items-center gap-2 text-slate-500 hover:text-sky-500 font-medium transition-colors mb-6 cursor-pointer"><i className="ri-arrow-left-line"></i> Back to jobs</button>

        {/* Hero */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 mb-8 shadow-md shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-sky-100/50 to-transparent dark:from-sky-900/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl text-sky-500 shadow-sm"><i className="ri-briefcase-line"></i></div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><i className="ri-building-4-line"></i> {job.company_name || 'Company'}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="flex items-center gap-1.5"><i className="ri-map-pin-2-line"></i> {job.location}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="flex items-center gap-1.5"><i className="ri-time-line"></i> {timeAgo(job.created_at)}</span>
                </div>
              </div>
            </div>
            {user?.role === 'job_seeker' && (
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button onClick={() => navigate(`/jobs/${job.id}/apply`)} className="px-8 py-3.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-medium rounded-xl transition-all shadow-md shadow-sky-500/20 cursor-pointer flex items-center justify-center gap-2">Apply Now <i className="ri-send-plane-fill"></i></button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md shadow-slate-200/50 dark:shadow-none">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 whitespace-pre-line">{job.description}</div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md shadow-slate-200/50 dark:shadow-none">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Job Overview</h3>
              <div className="space-y-6">
                <div><span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Salary</span><span className="font-bold text-slate-900 dark:text-white text-lg">{job.salary ? `₦${Number(job.salary).toLocaleString()}` : 'Negotiable'}</span></div>
                <div><span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Location</span><span className="font-medium text-slate-800 dark:text-slate-200">{job.location}</span></div>
                <div><span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Remote</span><span className="font-medium text-slate-800 dark:text-slate-200">{job.is_remote ? 'Yes' : 'No'}</span></div>
                <div><span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Date Posted</span><span className="font-medium text-slate-800 dark:text-slate-200">{timeAgo(job.created_at)}</span></div>
              </div>
            </div>
            {user?.role === 'job_seeker' && (
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl p-8 text-white shadow-lg shadow-sky-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>
                <h3 className="font-bold text-2xl mb-2 relative z-10">Ready to apply?</h3>
                <p className="text-sky-100 text-sm mb-6 relative z-10">Submit your application directly through our platform.</p>
                <button onClick={() => navigate(`/jobs/${job.id}/apply`)} className="w-full py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer relative z-10 active:scale-95">Start Application</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
