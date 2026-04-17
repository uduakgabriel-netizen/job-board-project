import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { api, authService } from '../../lib/api';

export function JobSeekerApplications() {
  const user = authService.getUser();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get('/applications/');
        setApplications(res.data.results || res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const filtered = filter === 'all' ? applications : applications.filter((a: any) => a.status === filter);

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
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

  const handleWithdraw = async (id: number) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return;
    try {
      await api.delete(`/applications/${id}/`);
      setApplications(applications.filter(a => a.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <DashboardLayout userType="job_seeker" userName={user?.username || 'Job Seeker'} userEmail={user?.email || ''} userSubtitle="Job Seeker">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">My Applications</h1>
          <p className="text-slate-500 text-sm mt-1">Track all your job applications in one place.</p>
        </div>
        <Link to="/jobs" className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors shadow-md shadow-sky-500/20 text-sm">Browse Jobs</Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer capitalize ${filter === s ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-sky-300'}`}>{s === 'all' ? 'All' : s}</button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">{[1,2,3].map(i => <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><i className="ri-inbox-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i><p className="text-slate-500">{filter === 'all' ? "You haven't applied to any jobs yet." : `No ${filter} applications.`}</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4"><span className="font-semibold text-slate-900 dark:text-white block">{app.job_title || `Job #${app.job}`}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500">{timeAgo(app.applied_at)}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(app.status)}`}>{app.status}</span></td>
                    <td className="px-6 py-4 text-right">
                      {app.status === 'pending' && <button onClick={() => handleWithdraw(app.id)} className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer">Withdraw</button>}
                    </td>
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
