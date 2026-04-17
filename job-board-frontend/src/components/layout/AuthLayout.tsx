import React from 'react';
import { Navbar } from '../feature/Navbar';
import { Footer } from '../feature/Footer';

type AuthLayoutProps = {
  children: React.ReactNode;
  themeType?: 'job-seeker' | 'employer' | 'login';
  headline: string;
  subheadline: string;
  features?: string[];
  testimonials?: { quote: string; author: string }[];
};

export function AuthLayout({ children, themeType = 'job-seeker', headline, subheadline, features, testimonials }: AuthLayoutProps) {
  // Select premium Unsplash images matching the context perfectly
  const bgImage = themeType === 'employer' 
    ? '/img4.jpg' // employer specific image
    : '/img2.jpg'; // generic seeker image

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1 flex max-w-[85rem] mx-auto w-full pt-32 pb-16 px-6 lg:px-8 gap-8 relative z-10 mb-8 sm:mb-16">
        
        {/* LEFT COLUMN - Hidden on mobile, 50% width on Desktop */}
        <div className="hidden lg:flex flex-col flex-none w-1/2 relative rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Background Image */}
          <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Dark Overlay to make glassmorphism pop and ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply pointer-events-none"></div>

          {/* Glassmorphism Content Overlay */}
          <div className="relative z-10 flex-1 flex flex-col justify-between p-12 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-900/50 transition-all duration-500">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center text-3xl mb-8 text-white shadow-xl shadow-black/10">
                <i className={themeType === 'employer' ? "ri-building-4-line" : themeType === 'login' ? "ri-user-smile-line" : "ri-briefcase-4-line"}></i>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-md tracking-tight">
                {headline}
              </h1>
              <p className="text-white/90 text-xl mb-12 font-medium drop-shadow-sm">
                {subheadline}
              </p>

              {features && (
                <ul className="space-y-6">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-white text-lg font-medium drop-shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                        <i className="ri-check-line text-base"></i>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {testimonials && (
                <div className="space-y-6 mt-8">
                  {testimonials.map((testi, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl shadow-black/20">
                      <i className="ri-double-quotes-l text-3xl text-white/50 mb-3 block"></i>
                      <p className="italic text-lg mb-4 text-white font-medium drop-shadow-md leading-relaxed">{testi.quote}</p>
                      <p className="text-sm font-bold text-white tracking-wide uppercase">{testi.author}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (FORM) - 50% width Desktop, Full Mobile */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full lg:w-1/2 lg:pl-6">
           <div className="w-full max-w-lg relative z-20 mx-auto">
             {children}
           </div>
        </div>
      </main>

      {/* Global Background blobs for the whole page behind form */}
      <div className="absolute top-40 right-[-100px] w-[600px] h-[600px] bg-sky-200/50 dark:bg-sky-900/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-20 right-[20%] w-[500px] h-[500px] bg-blue-200/40 dark:bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-300" />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
