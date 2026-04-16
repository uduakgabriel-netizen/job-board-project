import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto relative group">
        
        {/* Main CTA Card */}
        <div className="relative z-10 w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-3xl px-8 py-20 overflow-hidden shadow-2xl shadow-sky-100/50 dark:shadow-none transition-all duration-300 text-center flex flex-col items-center justify-center">
          
          {/* Internal Decorative Blobs */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-sky-200/50 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-200/50 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />

          {/* Content */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-6 transition-colors duration-300">
            <i className="ri-rocket-line"></i> Start Your Journey
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white max-w-2xl mx-auto mb-6 tracking-tight transition-colors duration-300">
            Ready to Land Your Dream Job?
          </h2>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 transition-colors duration-300">
            Join thousands of professionals who have found their next career step through Jobberman-Lite. Create an account, build your profile, and start applying today.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 text-lg flex items-center justify-center gap-2"
            >
              Get Started Now <i className="ri-arrow-right-line"></i>
            </button>
            <button 
              onClick={() => navigate('/register/employer')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-700/60 backdrop-blur-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap active:scale-95 text-lg"
            >
              I am an Employer
            </button>
          </div>

          {/* Trust Strip */}
          <div className="w-full max-w-3xl pt-8 border-t border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center transition-colors duration-300">
                <i className="ri-verified-badge-line text-xl"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Verified Employers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center transition-colors duration-300">
                <i className="ri-shield-check-line text-xl"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Secure & Private</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center transition-colors duration-300">
                <i className="ri-flashlight-line text-xl"></i>
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Instant Applications</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
