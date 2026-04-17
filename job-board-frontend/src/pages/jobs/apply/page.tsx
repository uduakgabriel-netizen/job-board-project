import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';
import { api, authService } from '../../../lib/api';

export function JobApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = authService.getUser();

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFilename, setResumeFilename] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}/`);
        setJob(res.data);
      } catch { /* silent */ }
      finally { setJobLoading(false); }
    };
    fetchJob();
  }, [id]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setResumeFilename(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('job', String(id));
      formData.append('cover_letter', coverLetter);
      if (resumeFile) formData.append('resume', resumeFile);

      await api.post('/applications/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate(`/jobs/${id}/success`);
    } catch (err: any) {
      const data = err.response?.data;
      if (typeof data === 'object' && data.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else if (typeof data === 'string') {
        setError(data);
      } else {
        setError(data?.detail || 'Failed to submit application. You may have already applied.');
      }
    } finally {
      setLoading(false);
    }
  };

  const jobTitle = job?.title || 'Loading...';
  const companyName = job?.company_name || 'Company';

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar isAuthenticated={authService.isAuthenticated()} userType={user?.role || 'job_seeker'} />

      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img src="/img7.jpg" alt="" className="w-full h-full object-cover opacity-50 scale-105 object-center" />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <main className="flex-1 flex justify-center relative z-10 px-6 py-28 w-full">
        <div className="w-full max-w-2xl my-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors mb-6 cursor-pointer w-fit"><i className="ri-arrow-left-line"></i> Go Back</button>

          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/80 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
            <div className="mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl text-sky-400"><i className="ri-briefcase-line"></i></div>
                <div>
                  <h1 className="text-2xl font-bold text-white leading-tight">{jobTitle}</h1>
                  <p className="text-sky-300 font-medium text-sm">{companyName}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Please provide all necessary information below to complete your application.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 flex items-center gap-3">
                <i className="ri-error-warning-line text-xl"></i>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Resume / CV *</label>
                <label className="block w-full border-2 border-dashed border-white/30 rounded-2xl p-6 bg-slate-900/30 text-center hover:bg-slate-800/50 transition-colors cursor-pointer overflow-hidden relative text-white">
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
                  {resumeFilename ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-2xl mb-2"><i className="ri-file-check-line"></i></div>
                      <span className="font-semibold">{resumeFilename}</span>
                      <span className="text-xs text-slate-400 mt-1">Click to replace</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-slate-300 text-xl mx-auto mb-2"><i className="ri-upload-cloud-2-line"></i></div>
                      <span className="font-medium text-sm">Upload Resume</span>
                      <span className="text-xs text-slate-400 mt-1">PDF or DOCX max 5MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Cover Letter / Note</label>
                <textarea rows={4} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all custom-scrollbar" placeholder={`Tell ${companyName} why you are the best fit for this role...`}></textarea>
              </div>

              <div className="pt-6 mt-8 border-t border-white/10">
                <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-white font-bold transition-all cursor-pointer shadow-lg shadow-sky-500/30 disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading ? <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Submit Application'}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">By submitting, you agree to the sharing of your profile data with {companyName}.</p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
