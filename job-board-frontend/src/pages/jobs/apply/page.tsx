import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../../../mocks/jobs';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';

export function JobApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  
  const [loading, setLoading] = useState(false);
  const [resumeFilename, setResumeFilename] = useState<string | null>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFilename(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/jobs/${job.id}/success`); // redirect to appreciation page
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar isAuthenticated={true} userType="job_seeker" />

      {/* Cinematic Background container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1920&q=80" 
          alt="Application Background" 
          className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <main className="flex-1 flex justify-center relative z-10 px-6 py-28 w-full">
        <div className="w-full max-w-2xl my-8">
          
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors mb-6 cursor-pointer w-fit"
          >
            <i className="ri-arrow-left-line"></i> Go Back
          </button>

          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/80 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-colors duration-300">
            
            {/* Header */}
            <div className="mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4 mb-3">
                 <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl text-slate-400">
                   <i className={job.logo}></i>
                 </div>
                 <div>
                   <h1 className="text-2xl font-bold text-white leading-tight">{job.title}</h1>
                   <p className="text-indigo-300 font-medium text-sm">{job.company}</p>
                 </div>
              </div>
              <p className="text-slate-400 text-sm">Please provide all necessary information below to complete your application.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">First Name *</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" defaultValue="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">Last Name *</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" defaultValue="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">Email Address *</label>
                  <input required type="email" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2.5 text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" defaultValue="jane@example.com" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">Phone Number *</label>
                  <input required type="tel" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" defaultValue="+234 812 345 6789" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Resume / CV *</label>
                <label className="block w-full border-2 border-dashed border-white/30 dark:border-slate-500 rounded-2xl p-6 bg-slate-900/30 text-center hover:bg-slate-800/50 transition-colors cursor-pointer overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.05)] text-white">
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} required />
                  {resumeFilename ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-2xl mb-2">
                        <i className="ri-file-check-line"></i>
                      </div>
                      <span className="font-semibold">{resumeFilename}</span>
                      <span className="text-xs text-slate-400 mt-1">Click to replace</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-slate-300 text-xl mx-auto mb-2">
                        <i className="ri-upload-cloud-2-line"></i>
                      </div>
                      <span className="font-medium text-sm">Upload Resume</span>
                      <span className="text-xs text-slate-400 mt-1">PDF or DOCX max 5MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Cover Letter / Note</label>
                <textarea rows={4} className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder={`Tell ${job.company} why you are the best fit for this role...`}></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Portfolio / LinkedIn URL</label>
                <input type="url" className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="https://" />
              </div>

              {/* Submit Control */}
              <div className="pt-6 mt-8 border-t border-white/10">
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-600/30 disabled:opacity-70 flex items-center justify-center gap-2"
                 >
                   {loading ? <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Submit Application'}
                 </button>
                 <p className="text-center text-xs text-slate-400 mt-4">
                   By submitting, you agree to the sharing of your profile data with {job.company}.
                 </p>
              </div>
              
            </form>
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
