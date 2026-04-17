import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';

export function JobSeekerOnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const URL = window.URL || window.webkitURL;
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Step 2 State
  const [skills, setSkills] = useState<string[]>(['JavaScript', 'React']);
  const availableSkills = ['Python', 'Node.js', 'Typescript', 'Figma', 'UI/UX', 'CSS'];
  
  // Step 3 State
  const [isRemote, setIsRemote] = useState(false);
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(['Full-time']);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/jobs'); // Standard redirect for seeker
      }, 1500);
    }
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar isAuthenticated={true} userType="job_seeker" />

      {/* Cinematic Background container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src="/img6.jpg" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <main className="flex-1 flex justify-center relative z-10 px-6 py-28 w-full">
        <div className="w-full max-w-2xl my-8">
          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-colors duration-300">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white transition-colors duration-300">Complete Your Profile</h1>
              <p className="text-slate-300 mt-2 transition-colors duration-300">Let recruiters know your capabilities.</p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-3 mt-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className={`flex items-center ${i < 3 ? 'w-16 sm:w-24' : ''}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= i ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                     {step > i ? <i className="ri-check-line"></i> : i}
                   </div>
                   {i < 3 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${step > i ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>}
                 </div>
               ))}
            </div>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <label className="flex flex-col items-center justify-center mb-6 cursor-pointer group w-fit mx-auto">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  <div className="w-24 h-24 rounded-full bg-white/10 dark:bg-slate-700/50 border-2 border-dashed border-white/40 dark:border-slate-500 flex flex-col items-center justify-center text-white dark:text-slate-300 group-hover:bg-white/20 transition-all overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <i className="ri-image-add-line text-2xl mb-1"></i>
                        <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
                      </>
                    )}
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input type="tel" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="+234 800 000 0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date of Birth</label>
                    <input type="date" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location (City, State)</label>
                  <div className="relative">
                    <i className="ri-map-pin-2-line absolute left-4 top-3 text-slate-400"></i>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="e.g. Lagos, Nigeria" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1.5">About Me</label>
                  <textarea rows={4} className="w-full bg-slate-900/50 border border-white/20 dark:border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300 custom-scrollbar" placeholder="Tell employers about your background and goals..."></textarea>
                </div>
              </div>
            )}

            {/* STEP 2: Professional Information */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Years of Experience</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300 appearance-none">
                    <option value="">Select Level</option>
                    <option value="Fresher">Fresher (0-1 years)</option>
                    <option value="Entry">Entry Level (1-3 years)</option>
                    <option value="Mid">Mid Level (3-5 years)</option>
                    <option value="Senior">Senior Level (5-8 years)</option>
                    <option value="Expert">Expert (8+ years)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Job Title</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="e.g. Frontend Developer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Company (Optional)</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="e.g. Paystack" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map(s => (
                      <span key={s} className="pl-3 pr-2 py-1.5 rounded-lg bg-sky-500 text-white text-sm font-medium flex items-center gap-1 shadow-sm">
                        {s} <i className="ri-close-line cursor-pointer hover:bg-sky-600 rounded-full p-0.5" onClick={() => toggleSkill(s)}></i>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 w-full mb-1">Suggested skills:</span>
                    {availableSkills.filter(s => !skills.includes(s)).map(s => (
                      <button type="button" key={s} onClick={() => toggleSkill(s)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 text-sm hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer">
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Resume / CV</label>
                  <div className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50 text-center hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-sky-50 dark:bg-sky-900/30 rounded-xl flex items-center justify-center text-sky-500 text-2xl mx-auto mb-3">
                      <i className="ri-file-upload-line"></i>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag & drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF or DOCX (Max. 5MB)</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Job Preferences */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Desired Job Title</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="e.g. Senior Developer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expected Salary (Monthly)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-slate-500 font-medium font-sans">₦</span>
                      <input type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300" placeholder="500k - 1M" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Job Types</label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {jobTypes.map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => toggleJobType(type)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${
                          selectedJobTypes.includes(type)
                            ? 'bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-400'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsRemote(!isRemote)}>
                   <div>
                     <h4 className="font-medium text-slate-900 dark:text-white">Remote Work Only</h4>
                     <p className="text-sm text-slate-500 dark:text-slate-400">I only want to see jobs that offer 100% remote working.</p>
                   </div>
                   <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isRemote ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isRemote ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100 dark:border-slate-700/50">
               <div>
                 {step === 1 && (
                   <button type="button" onClick={() => navigate('/jobs')} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors cursor-pointer px-2">
                     Skip for now
                   </button>
                 )}
                 {step > 1 && (
                   <button type="button" onClick={() => setStep(step - 1)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors cursor-pointer flex items-center gap-1">
                     <i className="ri-arrow-left-line"></i> Back
                   </button>
                 )}
               </div>
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center gap-2"
               >
                 {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : (step === 3 ? 'Complete Profile' : 'Next Step')}
                 {!loading && step < 3 && <i className="ri-arrow-right-line"></i>}
               </button>
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
