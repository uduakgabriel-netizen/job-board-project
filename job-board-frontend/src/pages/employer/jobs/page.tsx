import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function ManagedJobsPage() {
  const user = authService.getUser();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/jobs/');
        setJobs(res.data.results || res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <DashboardLayout userType="employer" userName={user?.username || 'Employer'} userEmail={user?.email || ''} userSubtitle="Employer">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">My Jobs</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all your job postings.</p>
        </div>
        <Link to="/employer/jobs/new" className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors shadow-md shadow-sky-500/20 text-sm flex items-center gap-2"><i className="ri-add-line"></i> Post a Job</Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>)}</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center"><i className="ri-briefcase-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i><p className="text-slate-500 mb-4">You haven't posted any jobs yet.</p><Link to="/employer/jobs/new" className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-medium inline-block">Post Your First Job</Link></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job Title</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Location</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Salary</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Posted</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((job: any) => (
                  <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4"><span className="font-semibold text-slate-900 dark:text-white block">{job.title}</span><span className="text-xs text-slate-500">{job.company_name}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{job.location}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{job.salary ? `₦${Number(job.salary).toLocaleString()}` : '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{timeAgo(job.created_at)}</td>
                    <td className="px-6 py-4 text-right"><Link to={`/jobs/${job.id}`} className="text-sky-500 hover:text-sky-600 text-sm font-medium">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
