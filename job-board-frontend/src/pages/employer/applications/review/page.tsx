import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../../components/layout/DashboardLayout';
import { api, authService } from '../../../../lib/api';

export function ApplicationReviewDetailsPage() {
  const user = authService.getUser();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState<number | null>(null);
  const [notified, setNotified] = useState<number[]>([]);

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

  const filtered = filter === 'all' 
    ? applications.filter((a: any) => a.status === 'pending' || a.status === 'reviewed')
    : applications.filter((a: any) => a.status === filter);

  const notifyInterview = async (appId: number) => {
    setUpdating(appId);
    try {
      // Simulate sending interview email/notification & mark accepted
      await api.patch(`/applications/${appId}/`, { status: 'accepted' });
      setApplications(applications.map(a => a.id === appId ? { ...a, status: 'accepted' } : a));
      setNotified(prev => [...prev, appId]);
      setTimeout(() => {
        setNotified(prev => prev.filter(id => id !== appId));
      }, 5000);
    } catch (err) { 
      console.error(err); 
    }
    finally { setUpdating(null); }
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
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Review & Notify</h1>
        <p className="text-slate-500 text-sm mt-1">Review applicant cover letters and notify selected candidates for an interview.</p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl animate-pulse h-40"></div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <i className="ri-inbox-line text-4xl text-slate-300 dark:text-slate-600 mb-3 block"></i>
            <p className="text-slate-500">No applications to review.</p>
          </div>
        ) : filtered.length === 0 ? (
           <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <i className="ri-check-double-line text-4xl text-emerald-300 dark:text-emerald-600 mb-3 block"></i>
            <p className="text-slate-500">All pending applications have been reviewed.</p>
          </div>
        ) : (
          filtered.map(app => (
            <div key={app.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden relative group">
              {notified.includes(app.id) && (
                <div className="absolute inset-0 bg-emerald-50/90 dark:bg-emerald-900/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                   <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg mb-4">
                     <i className="ri-mail-send-line text-3xl"></i>
                   </div>
                   <h3 className="text-xl font-bold">Interview Invitation Sent!</h3>
                   <p className="text-sm font-medium mt-1 text-emerald-700/80 dark:text-emerald-300/80">{app.applicant} has been notified.</p>
                </div>
              )}
              
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center font-bold text-xl uppercase shadow-sm">
                      {app.applicant ? app.applicant[0] : 'U'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{app.applicant}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Applied for <span className="font-medium text-slate-700 dark:text-slate-300">{app.job_title || `Job #${app.job}`}</span></p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                       <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor(app.status)}`}>{app.status}</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Cover Letter</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                      {app.cover_letter || "No cover letter provided by the applicant."}
                    </p>
                  </div>
                </div>

                <div className="lg:w-64 flex flex-col gap-3 lg:border-l border-slate-100 dark:border-slate-800 lg:pl-6 pt-4 lg:pt-0">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 lg:mt-2">Applicant Files</h4>
                  {app.resume ? (
                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all group/resume">
                      <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center group-hover/resume:scale-110 transition-transform">
                        <i className="ri-file-pdf-line text-lg"></i>
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-slate-900 dark:text-white">Resume.pdf</p>
                         <p className="text-xs text-slate-500">Click to view</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-70">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-400 flex items-center justify-center">
                        <i className="ri-file-forbid-line text-lg"></i>
                      </div>
                      <div>
                         <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No Resume</p>
                         <p className="text-xs text-slate-400 dark:text-slate-500">Not uploaded</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4 space-y-2">
                    <button 
                      disabled={updating === app.id} 
                      onClick={() => notifyInterview(app.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-all shadow-md shadow-sky-500/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 cursor-pointer"
                    >
                      {updating === app.id ? <i className="ri-loader-4-line animate-spin text-lg"></i> : <i className="ri-mail-send-line text-lg"></i>}
                      Notify for Interview
                    </button>
                    {app.status === 'pending' && (
                       <button 
                         disabled={updating === app.id}
                         onClick={async () => {
                            setUpdating(app.id);
                            await api.patch(`/applications/${app.id}/`, { status: "rejected" });
                            setApplications(applications.map(a => a.id === app.id ? { ...a, status: 'rejected' } : a));
                            setUpdating(null);
                         }}
                         className="w-full py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900 dark:hover:bg-rose-900/30 text-rose-600 text-sm font-medium transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                       >
                         Decline Applicant
                       </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
