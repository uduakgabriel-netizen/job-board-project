import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function ApplicationReviewPage() {
  const user = authService.getUser();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState<number | null>(null);

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

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdating(id);
    try {
      await api.patch(`/applications/${id}/`, { status: newStatus });
      setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) { console.error(err); }
    finally { setUpdating(null); }
  };

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
    <DashboardLayout userType="employer" userName={user?.username || 'Employer'} userEmail={user?.email || ''} userSubtitle="Employer">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Applications Review</h1>
        <p className="text-slate-500 text-sm mt-1">Review and manage all applications for your job postings.</p>
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
          <div className="p-12 text-center"><i className="ri-inbox-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i><p className="text-slate-500">{filter === 'all' ? 'No applications yet.' : `No ${filter} applications.`}</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applicant</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th><th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((app: any) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{app.applicant}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{app.job_title || `Job #${app.job}`}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{timeAgo(app.applied_at)}</td>
                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(app.status)}`}>{app.status}</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.status === 'pending' && <button disabled={updating === app.id} onClick={() => updateStatus(app.id, 'reviewed')} className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-medium hover:bg-sky-100 dark:hover:bg-sky-900/50 cursor-pointer disabled:opacity-50">Review</button>}
                        {(app.status === 'pending' || app.status === 'reviewed') && (
                          <>
                            <button disabled={updating === app.id} onClick={() => updateStatus(app.id, 'accepted')} className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-100 cursor-pointer disabled:opacity-50">Accept</button>
                            <button disabled={updating === app.id} onClick={() => updateStatus(app.id, 'rejected')} className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-100 cursor-pointer disabled:opacity-50">Reject</button>
                          </>
                        )}
                      </div>
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
