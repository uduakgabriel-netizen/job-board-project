import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function JobSeekerDashboard() {
  const user = authService.getUser();
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [appsRes, jobsRes] = await Promise.all([
          api.get('/applications/'),
          api.get('/jobs/', { params: { page_size: 4 } }),
        ]);
        setApplications(appsRes.data.results || appsRes.data);
        setJobs((jobsRes.data.results || jobsRes.data).slice(0, 4));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const totalApps = applications.length;
  const reviewed = applications.filter((a: any) => ['reviewed', 'accepted'].includes(a.status)).length;

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'pending': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'reviewed': return 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400';
      case 'accepted': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'rejected': return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <DashboardLayout userType="job_seeker" userName={user?.username || 'Job Seeker'} userEmail={user?.email || ''} userSubtitle="Job Seeker">
      {/* Welcome */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 mb-6 shadow-md shadow-slate-200/50 dark:shadow-none">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Good morning, {user?.username}!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Here is what is happening with your job search today.</p>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-end mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Profile Completion</span>
            <span className="text-sky-500 font-bold">75%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden"><div className="bg-sky-500 h-full rounded-full" style={{ width: '75%' }}></div></div>
          <Link to="/settings/profile" className="text-sm font-medium text-sky-500 hover:text-sky-600 flex items-center gap-1">Complete your profile <i className="ri-arrow-right-s-line"></i></Link>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[1,2,3].map(i => <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2"></div><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Applications Sent', value: totalApps, icon: 'ri-send-plane-line', bg: 'bg-sky-50 dark:bg-sky-900/30', color: 'text-sky-500' },
            { label: 'Interviews / Reviewed', value: reviewed, icon: 'ri-calendar-event-line', bg: 'bg-purple-50 dark:bg-purple-900/30', color: 'text-purple-500' },
            { label: 'Available Jobs', value: jobs.length + '+', icon: 'ri-medal-line', bg: 'bg-emerald-50 dark:bg-emerald-900/30', color: 'text-emerald-500' },
          ].map(m => (
            <div key={m.label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${m.bg} ${m.color} flex items-center justify-center text-2xl`}><i className={m.icon}></i></div>
              <div><p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{m.label}</p><h3 className="text-2xl font-bold text-slate-900 dark:text-white">{m.value}</h3></div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Jobs */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest Jobs</h2>
          <Link to="/jobs" className="text-sky-500 hover:text-sky-600 font-medium text-sm">View All</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[1,2].map(i => <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse h-32"></div>)}</div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job: any) => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-sky-300 dark:hover:border-sky-700 transition-all group shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors mb-1">{job.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{job.company_name || 'Company'} • {job.location}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{job.salary ? `₦${Number(job.salary).toLocaleString()}` : 'Negotiable'}</span>
                  {job.is_remote && <span className="px-2 py-0.5 rounded text-xs bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">Remote</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center"><p className="text-slate-500">No jobs available yet. Check back later!</p></div>
        )}
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h2>
          <Link to="/applications" className="text-sky-500 hover:text-sky-600 font-medium text-sm">View All</Link>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">{[1,2].map(i => <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>)}</div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center"><i className="ri-inbox-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i><p className="text-slate-500">You haven't applied to any jobs yet.</p><Link to="/jobs" className="text-sky-500 font-medium text-sm mt-2 inline-block">Browse Jobs →</Link></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job Title</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied On</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.slice(0, 5).map((app: any) => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{app.job_title || `Job #${app.job}`}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{timeAgo(app.applied_at)}</td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(app.status)}`}>{app.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
