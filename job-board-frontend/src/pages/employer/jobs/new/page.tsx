import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../../../components/layout/DashboardLayout';
import { api, authService } from '../../../../lib/api';

export function CreateJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = authService.getUser();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const fullDescription = `${description}\n\nResponsibilities:\n${responsibilities}\n\nRequirements:\n${requirements}`;
      await api.post('/jobs/', {
        title,
        description: fullDescription,
        location: jobLocation,
        salary: salary ? parseFloat(salary.replace(/,/g, '')) : null,
        is_remote: isRemote,
      });
      setSuccess(true);
      setTimeout(() => navigate('/employer/jobs'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.detail || 'Failed to post job. Make sure you have a company profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userType="employer" userName={user?.username || 'Employer'} userEmail={user?.email || ''} userSubtitle="Employer">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post a New Job</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Fill in the details to publish a new job listing.</p>
        </div>
        <button onClick={() => navigate('/employer/jobs')} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer">Cancel</button>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800/50 dark:text-emerald-400 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0"><i className="ri-check-line font-bold"></i></div>
          <div><h4 className="font-bold text-sm">Success! Your job has been posted successfully.</h4><p className="text-xs opacity-90">Redirecting you to your jobs dashboard...</p></div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400 flex items-center gap-3 shadow-sm">
          <i className="ri-error-warning-line text-xl"></i>
          <div><h4 className="font-bold text-sm">Failed to post job</h4><p className="text-xs opacity-90">{error}</p></div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md shadow-slate-200/50 dark:shadow-none mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Title</label><input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="e.g. Senior Frontend Developer" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label><input type="text" value={jobLocation} onChange={e => setJobLocation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="e.g. Lagos, Nigeria" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Salary (Optional)</label><input type="text" value={salary} onChange={e => setSalary(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="e.g. 500000" /></div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={isRemote} onChange={e => setIsRemote(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">This is a remote position</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Job Details</h3>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Description</label><textarea required rows={5} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 custom-scrollbar" placeholder="Describe the role..."></textarea></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Responsibilities</label><textarea rows={4} value={responsibilities} onChange={e => setResponsibilities(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 custom-scrollbar" placeholder="One per line..."></textarea></div>
            <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Requirements & Qualifications</label><textarea rows={4} value={requirements} onChange={e => setRequirements(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 custom-scrollbar" placeholder="One per line..."></textarea></div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
            <button type="button" onClick={() => navigate('/employer/jobs')} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading || success} className="px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all shadow-md shadow-sky-500/20 active:scale-95 disabled:opacity-70 flex items-center gap-2 cursor-pointer">
              {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
