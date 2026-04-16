import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';

export function EmployerOnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Logo Preview State
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const URL = window.URL || window.webkitURL;
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Step 1 State
  const benefitsOptions = ['Health Insurance', 'Paid Time Off', 'Remote Work', 'Professional Development', 'Gym Membership', 'Stock Options'];
  const [benefits, setBenefits] = useState<string[]>(['Health Insurance']);

  // Step 2 State
  const [receiveEmail, setReceiveEmail] = useState(true);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard/employer');
      }, 1500);
    }
  };

  const toggleBenefit = (b: string) => {
    setBenefits(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 transition-colors duration-500 relative">
      <Navbar isAuthenticated={true} userType="employer" />

      {/* Cinematic Background container */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply backdrop-blur-sm"></div>
      </div>

      <main className="flex-1 flex justify-center relative z-10 px-6 py-28 w-full">
        <div className="w-full max-w-2xl my-8">
          <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-700/80 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-colors duration-300">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-bold mb-4 tracking-wider">EMPLOYER ONBOARDING</div>
              <h1 className="text-3xl font-bold text-white transition-colors duration-300">Company Overview</h1>
              <p className="text-slate-300 mt-2 transition-colors duration-300">Set up your company profile to attract top talent.</p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-3 mt-6">
               {[1, 2].map(i => (
                 <div key={i} className={`flex items-center ${i < 2 ? 'w-16 sm:w-32' : ''}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= i ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-700 text-slate-500'}`}>
                     {step > i ? <i className="ri-check-line"></i> : i}
                   </div>
                   {i < 2 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${step > i ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>}
                 </div>
               ))}
            </div>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            
            {/* STEP 1: Company Branding */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-medium text-slate-200 mb-1.5">Company Logo</label>
                     <label className="block w-full h-32 border-2 border-dashed border-white/30 dark:border-slate-600 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:bg-white/10 dark:hover:bg-slate-700/50 hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                       <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                       {logoPreview ? (
                         <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                       ) : (
                         <>
                           <i className="ri-image-add-line text-3xl mb-1 text-white"></i>
                           <span className="text-xs">Drag logo here or click</span>
                         </>
                       )}
                     </label>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-300 mb-1.5">Cover Image (Optional)</label>
                     <div className="w-full h-32 border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-700/50 hover:border-indigo-400 transition-colors cursor-pointer">
                       <i className="ri-layout-top-line text-3xl mb-1"></i>
                       <span className="text-xs">Wide banner image</span>
                     </div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Overview</label>
                  <textarea rows={3} required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="What does your company do?"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Culture</label>
                  <textarea rows={2} required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Describe the working environment..."></textarea>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Perks & Benefits</label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                     {benefitsOptions.map(b => (
                       <label key={b} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${benefits.includes(b) ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300' : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-600'}`}>
                         <input 
                           type="checkbox" 
                           checked={benefits.includes(b)}
                           onChange={() => toggleBenefit(b)}
                           className="hidden"
                         />
                         <div className={`w-4 h-4 rounded flex items-center justify-center border ${benefits.includes(b) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-500'}`}>
                           {benefits.includes(b) && <i className="ri-check-line text-white text-[10px]"></i>}
                         </div>
                         <span className="text-xs font-medium">{b}</span>
                       </label>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {/* STEP 2: Hiring Preferences */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Primary Contact Person</label>
                    <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. John HR Manager" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Contact Phone</label>
                    <input required type="tel" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="+234 800 000 0000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-medium text-slate-300 mb-1.5">Typical Response Time</label>
                     <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                       <option value="24h">Within 24 hours</option>
                       <option value="48h">Within 48 hours</option>
                       <option value="1w">Within 1 week</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-300 mb-1.5">Candidate Location Pref.</label>
                     <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                       <option value="Any">Any location</option>
                       <option value="Nigeria">Nigeria only</option>
                       <option value="Lagos">Lagos only</option>
                     </select>
                   </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer" onClick={() => setReceiveEmail(!receiveEmail)}>
                   <div>
                     <h4 className="font-medium text-white">Receive Applications via Email</h4>
                     <p className="text-sm text-slate-400">We'll alert you immediately every time a candidate applies.</p>
                   </div>
                   <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${receiveEmail ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${receiveEmail ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Auto-Reply Message to Applicants</label>
                  <textarea rows={3} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Thank you for applying to [Company]! We have received your application..."></textarea>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-700/50">
               <div>
                 {step > 1 && (
                   <button type="button" onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white font-medium transition-colors cursor-pointer flex items-center gap-1">
                     <i className="ri-arrow-left-line"></i> Back
                   </button>
                 )}
               </div>
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2"
               >
                 {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : (step === 2 ? 'Save Profile' : 'Next Step')}
                 {!loading && step < 2 && <i className="ri-arrow-right-line"></i>}
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
