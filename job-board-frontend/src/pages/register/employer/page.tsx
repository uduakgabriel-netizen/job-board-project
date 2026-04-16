import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout';

export function RegisterEmployerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/employer/pending');
      }, 1500);
    }
  };

  return (
    <AuthLayout
      themeType="employer"
      headline="Find Your Next Great Hire"
      subheadline="Connect with qualified candidates in your industry"
      features={[
        "Post unlimited jobs easily",
        "Access broad candidate database",
        "Powerful analytics and insights"
      ]}
    >
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 rounded-3xl shadow-2xl shadow-indigo-500/10 dark:shadow-none transition-colors duration-300 w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              Register Company
            </h2>
            <span className="text-indigo-500 font-bold text-sm bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              Step {step} of 3
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
            Already have an account? <Link to="/login" className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors">Sign In →</Link>
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-6 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form className="space-y-4 pt-2" onSubmit={handleNext}>
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Account Information</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email (Company domain)</label>
                <input required type="email" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="hr@yourcompany.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="company_hr" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                  <input required type="password" minLength={8} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
                  <input required type="password" minLength={8} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="••••••••" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Company Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                  <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Website</label>
                  <input required type="url" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="https://acme.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Size</label>
                  <select required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Industry</label>
                  <select required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Location</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="Lagos, Nigeria" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Description</label>
                <textarea required rows={3} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Briefly describe your company..."></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Verification</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Phone</label>
                <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="+234 800 000 0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Job Title</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="E.g. HR Manager, CEO" />
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50 mt-4">
                <div className="flex items-start gap-3">
                  <input required type="checkbox" id="auth_check" className="w-5 h-5 mt-0.5 rounded border-indigo-300 text-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-900 cursor-pointer" />
                  <label htmlFor="auth_check" className="text-sm text-indigo-900 dark:text-indigo-200 cursor-pointer font-medium leading-relaxed">
                    I confirm that I have the authority to create an account and post jobs on behalf of this company, and I agree to the terms of service.
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4 mt-8">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="w-1/3 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 text-center"
              >
                Back
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className={`${step > 1 ? 'w-2/3' : 'w-full'} py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300 cursor-pointer active:scale-95 shadow-md shadow-indigo-500/20 disabled:opacity-70 flex items-center justify-center gap-2`}
            >
              {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : (step === 3 ? 'Complete Registration' : 'Next Step')}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
