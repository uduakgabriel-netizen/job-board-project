import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function EmployerProfileSettings() {
  const user = authService.getUser();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const [companyId, setCompanyId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      try {
        const res = await api.get('/companies/');
        const companies = res.data.results || res.data;
        // Find the company owned by the current user
        const myCompany = companies.find((c: any) => c.owner === user?.id) || companies[0];
        if (myCompany) {
          setCompanyId(myCompany.id);
          setName(myCompany.name || '');
          setWebsite(myCompany.website || '');
          setDescription(myCompany.description || '');
          setLocation(myCompany.location || '');
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchCompany();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      if (companyId) {
        await api.patch(`/companies/${companyId}/`, { name, website, description, location });
      } else {
        await api.post('/companies/', { name, website, description, location });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout userType="employer" userName={user?.username || 'Employer'} userEmail={user?.email || ''} userSubtitle="Employer" avatarUrl={logoPreview || undefined}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your brand identity, overview, and contact info.</p>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800/50 dark:text-emerald-400 flex items-center gap-3 shadow-sm">
          <i className="ri-check-line text-xl"></i> <span className="font-medium text-sm">Company profile saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-400 flex items-center gap-3 shadow-sm">
          <i className="ri-error-warning-line text-xl"></i> <span className="font-medium text-sm">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-6 animate-pulse">
            <div className="h-28 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
            <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-2/3"></div>
            <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-1/2"></div>
            <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Brand Identity</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Company Logo</p>
                  <label className="block w-28 h-28 rounded-2xl bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-100 dark:border-sky-800/50 flex flex-col items-center justify-center text-sky-500 cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors relative overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                    {logoPreview ? (<><img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-medium">Change</div></>) : (<><i className="ri-building-4-line text-3xl mb-1"></i><span className="text-xs font-medium">Change Logo</span></>)}
                  </label>
                </div>
                <div className="flex-1 w-full">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Cover Image Banner</p>
                  <label className="block w-full h-28 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors relative overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
                    {bannerPreview ? (<><img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-medium">Change Banner</div></>) : (<><i className="ri-image-add-line text-2xl mb-1"></i><span className="text-xs font-medium">Upload banner image</span></>)}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label><input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Website</label><input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" /></div>
                <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label><input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Overview</label><textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 custom-scrollbar"></textarea></div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
              <button type="submit" disabled={saving} className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center gap-2">
                {saving ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-line"></i>} Save Company Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
