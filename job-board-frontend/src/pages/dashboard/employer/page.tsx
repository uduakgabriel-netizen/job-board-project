import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function EmployerDashboard() {
  const user = authService.getUser();
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [jobsRes, appsRes] = await Promise.all([
          api.get('/jobs/'),
          api.get('/applications/'),
        ]);
        setJobs(jobsRes.data.results || jobsRes.data);
        setApplications(appsRes.data.results || appsRes.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeJobs = jobs.length;
  const totalApplications = applications.length;
  const reviewedApps = applications.filter((a: any) => a.status === 'reviewed').length;
  const acceptedApps = applications.filter((a: any) => a.status === 'accepted').length;

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
      default: return 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <DashboardLayout userType="employer" userName={user?.username || 'Employer'} userEmail={user?.email || ''} userSubtitle="Employer Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.username}!</h1>
        <p className="text-slate-500 text-sm mt-1">Here's what's happening with your job postings.</p>
      </div>

      {/* Metrics */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 animate-pulse"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2"></div><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: activeJobs, icon: 'ri-briefcase-line', color: 'text-sky-500' },
            { label: 'Applications', value: totalApplications, icon: 'ri-file-list-3-line', color: 'text-emerald-500' },
            { label: 'Reviewed', value: reviewedApps, icon: 'ri-eye-line', color: 'text-amber-500' },
            { label: 'Hired', value: acceptedApps, icon: 'ri-user-star-line', color: 'text-violet-500' },
          ].map(m => (
            <div key={m.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{m.value}</span>
                <div className={`w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${m.color} text-xl`}><i className={m.icon}></i></div>
              </div>
              <p className="text-sm text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Post a Job', path: '/employer/jobs/new', icon: 'ri-add-circle-line', color: 'bg-sky-500' },
          { label: 'My Jobs', path: '/employer/jobs', icon: 'ri-briefcase-line', color: 'bg-emerald-500' },
          { label: 'Company Profile', path: '/employer/profile', icon: 'ri-building-line', color: 'bg-violet-500' },
          { label: 'Applications', path: '/employer/applications', icon: 'ri-file-list-3-line', color: 'bg-amber-500' },
        ].map(a => (
          <Link key={a.label} to={a.path} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-sky-300 dark:hover:border-sky-700 transition-all group text-center shadow-sm">
            <div className={`w-12 h-12 ${a.color} rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-3`}><i className={a.icon}></i></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-sky-500 transition-colors">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 dark:text-white text-lg">Recent Applications</h2>
          <Link to="/employer/applications" className="text-sky-500 hover:text-sky-600 text-sm font-medium">View All →</Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>)}</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center"><i className="ri-inbox-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i><p className="text-slate-500">No applications yet. Post a job to start receiving applications!</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Applicant</th><th className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Job</th><th className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th><th className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {applications.slice(0, 5).map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{app.applicant}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{app.job_title || `Job #${app.job}`}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{timeAgo(app.applied_at)}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(app.status)}`}>{app.status}</span></td>
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
