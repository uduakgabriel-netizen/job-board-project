import { Link } from 'react-router-dom';
import { Navbar } from '../../components/feature/Navbar';
import { Footer } from '../../components/feature/Footer';

export function AccountTypeSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar />

      {/* Cinematic Background container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-28 w-full">
        {/* Glassmorphism Wrapper */}
        <div className="w-full max-w-4xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl p-8 md:p-12 rounded-[2.5rem] text-center transform transition-all duration-500 hover:shadow-cyan-500/10">
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
             Join Jobberman-Lite
           </h1>
           <p className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto drop-shadow">
             Select your account type to proceed. Whether you are looking for your dream job or searching for top talent, we have got you covered.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
             
             {/* Job Seeker Selection */}
             <Link 
               to="/register/job-seeker"
               className="group relative bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-sky-500/60 p-8 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center shadow-lg active:scale-95"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-sky-500/0 to-sky-500/10 group-hover:to-sky-500/30 transition-all duration-500"></div>
               
               <div className="w-20 h-20 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center text-4xl mb-6 shadow-[-0_0_20px_rgba(56,189,248,0.2)] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500">
                 <i className="ri-user-smile-line"></i>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-3">I'm a Job Seeker</h2>
               <p className="text-slate-400 text-sm font-medium mb-4">
                 Create a profile, browse roles, and apply to top companies globally.
               </p>
               
               <div className="mt-auto flex items-center gap-2 text-sky-400 font-bold group-hover:gap-3 transition-all duration-300">
                 Sign up as Seeker <i className="ri-arrow-right-line"></i>
               </div>
             </Link>

             {/* Employer Selection */}
             <Link 
               to="/register/employer"
               className="group relative bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-indigo-500/60 p-8 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center shadow-lg active:scale-95"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/10 group-hover:to-indigo-500/30 transition-all duration-500"></div>
               
               <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500">
                 <i className="ri-building-4-line"></i>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-3">I'm an Employer</h2>
               <p className="text-slate-400 text-sm font-medium mb-4">
                 Post specific job openings, hire verified candidates, and scale your team.
               </p>
               
               <div className="mt-auto flex items-center gap-2 text-indigo-400 font-bold group-hover:gap-3 transition-all duration-300">
                 Sign up as Employer <i className="ri-arrow-right-line"></i>
               </div>
             </Link>

           </div>
           
           <p className="text-slate-400 font-medium mt-10">
             Already have an account? <Link to="/login" className="text-white hover:text-sky-400 underline transition-colors">Sign In completely</Link>
           </p>

        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
