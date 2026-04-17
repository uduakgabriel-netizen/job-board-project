import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';
import { api } from '../../../lib/api';

export function ApplicationSuccessPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}/`);
        setJob(res.data);
      } catch { /* silent */ }
    };
    fetchJob();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar isAuthenticated={true} userType="job_seeker" />

      {/* Cinematic Background container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img src="/img7.jpg" alt="Success Background" className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow object-center" />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply backdrop-blur-md"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-28 w-full">
        <div className="w-full max-w-lg">
          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 p-10 sm:p-12 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-colors duration-300 text-center animate-fade-in-up">
            
            <div className="relative mx-auto w-24 h-24 mb-8">
               <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-20"></div>
               <div className="relative w-full h-full bg-gradient-to-tr from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/40 border-4 border-slate-900/50">
                 <i className="ri-check-line text-5xl text-white"></i>
               </div>
               <i className="ri-sparkling-fill absolute -top-2 -right-4 text-sky-400 text-xl animate-bounce" style={{animationDelay: '100ms'}}></i>
               <i className="ri-star-s-fill absolute top-1/2 -left-6 text-sky-400 justify-center animate-pulse" style={{animationDelay: '300ms'}}></i>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Application Sent!</h1>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Thank you for applying to the <span className="font-bold text-white">{job?.title || 'Job'}</span> position. We have successfully forwarded your portfolio to <span className="font-bold text-sky-400">{job?.company_name || 'the company'}</span>.
            </p>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 mb-8 text-left flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-sky-500/20 flex flex-shrink-0 items-center justify-center text-sky-400 mt-1">
                 <i className="ri-mail-send-line text-lg"></i>
               </div>
               <div>
                  <h4 className="text-white font-medium mb-1">What happens next?</h4>
                  <p className="text-sm text-slate-400">You will be notified via email as soon as the hiring team reviews your application. You can track your status anytime in your dashboard.</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/applications" className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md shadow-sky-500/20 active:scale-95">
                Track Status
              </Link>
              <Link to="/jobs" className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium rounded-xl transition-all duration-300 active:scale-95">
                Find More Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
