import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout';
import { api, authService } from '../../../lib/api';

export function RegisterEmployerPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 fields
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Step 3 — submit everything
      setLoading(true);

      const nameParts = fullName.trim().split(' ');
      const first_name = nameParts[0] || '';
      const last_name = nameParts.slice(1).join(' ') || '';

      try {
        // 1. Register employer user
        await api.post('/auth/register/employer/', { username, email, password, first_name, last_name });

        // 2. Auto-login
        const loginRes = await api.post('/auth/login/', { username, password });
        const { access, refresh, user } = loginRes.data;
        authService.setSession(access, refresh, user);

        // 3. Create company profile
        await api.post('/companies/', {
          name: companyName,
          website: companyWebsite,
          location: companyLocation,
          description: companyDescription,
        });

        navigate('/dashboard/employer');
      } catch (err: any) {
        const data = err.response?.data;
        if (data) {
          const msg = typeof data === 'string' ? data
            : data.username ? `Username: ${data.username[0]}`
            : data.email ? `Email: ${data.email[0]}`
            : data.password ? `Password: ${data.password[0]}`
            : data.error || data.detail || 'Registration failed. Please try again.';
          setError(msg);
        } else {
          setError('Network error. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthLayout themeType="employer" headline="Find Your Next Great Hire" subheadline="Connect with qualified candidates in your industry"
      features={["Post unlimited jobs easily", "Access broad candidate database", "Powerful analytics and insights"]}>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white dark:border-slate-700/50 p-8 rounded-3xl shadow-2xl shadow-sky-500/10 dark:shadow-none transition-colors duration-300 w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Register Company</h2>
            <span className="text-sky-500 font-bold text-sm bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full">Step {step} of 3</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Already have an account? <Link to="/login" className="text-sky-500 hover:text-sky-600 font-medium">Sign In →</Link></p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-6 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400 text-sm flex items-center gap-2">
            <i className="ri-error-warning-line"></i> {error}
          </div>
        )}

        <form className="space-y-4 pt-2" onSubmit={handleNext}>
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Account Information</h3>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label><input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="Jane Doe" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label><input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="hr@yourcompany.com" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label><input required type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="company_hr" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label><input required type="password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="••••••••" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label><input required type="password" minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="••••••••" /></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Company Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label><input required type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="Acme Corp" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Website</label><input type="url" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="https://acme.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Size</label>
                  <select required value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none">
                    <option value="">Select size</option><option value="1-10">1-10 employees</option><option value="11-50">11-50 employees</option><option value="51-200">51-200 employees</option><option value="201-500">201-500 employees</option><option value="500+">500+ employees</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Industry</label>
                  <select required value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none">
                    <option value="">Select industry</option><option value="Technology">Technology</option><option value="Finance">Finance</option><option value="Healthcare">Healthcare</option><option value="Education">Education</option><option value="Retail">Retail</option><option value="Manufacturing">Manufacturing</option><option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Location</label><input required type="text" value={companyLocation} onChange={e => setCompanyLocation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="Lagos, Nigeria" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Description</label><textarea required rows={3} value={companyDescription} onChange={e => setCompanyDescription(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all custom-scrollbar" placeholder="Briefly describe your company..."></textarea></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-4">Verification</h3>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Phone</label><input required type="tel" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="+234 800 000 0000" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Job Title</label><input required type="text" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" placeholder="E.g. HR Manager, CEO" /></div>
              <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-100 dark:border-sky-800/50 mt-4">
                <div className="flex items-start gap-3">
                  <input required type="checkbox" id="auth_check" className="w-5 h-5 mt-0.5 rounded border-sky-300 text-sky-500 focus:ring-sky-500 cursor-pointer" />
                  <label htmlFor="auth_check" className="text-sm text-sky-900 dark:text-sky-200 cursor-pointer font-medium leading-relaxed">I confirm that I have the authority to create an account and post jobs on behalf of this company, and I agree to the terms of service.</label>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4 mt-8">
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="w-1/3 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-medium transition-all cursor-pointer active:scale-95 text-center">Back</button>
            )}
            <button type="submit" disabled={loading} className={`${step > 1 ? 'w-2/3' : 'w-full'} py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition-all cursor-pointer active:scale-95 shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center justify-center gap-2`}>
              {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : (step === 3 ? 'Complete Registration' : 'Next Step')}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
