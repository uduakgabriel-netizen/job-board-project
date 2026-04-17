import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { api, authService } from '../../../lib/api';

export function JobSeekerProfileSettings() {
  const user = authService.getUser();
  const [loading, setLoading] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    title: '',
    location: ''
  });

  // Fetch full profile if an endpoint exists, otherwise fallback to local User info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile/');
        if (res.data) {
          setPersonalInfo(prev => ({ ...prev, ...res.data }));
        }
      } catch { /* ignore if endpoint doesn't exist yet */ }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/auth/profile/', personalInfo);
      // Optional: show success toast
    } catch {
      // Handle error
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <DashboardLayout 
      userType="job_seeker"
      userName={`${personalInfo.firstName} ${personalInfo.lastName}` || user?.username}
      userEmail={personalInfo.email}
      userSubtitle={personalInfo.title || 'Job Seeker'}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
           <p className="text-slate-500 text-sm mt-1">Manage your personal information, CV, and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Quick Edits & Resume */}
        <div className="xl:col-span-1 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Profile Picture</h3>
             <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg flex items-center justify-center text-4xl text-slate-400 relative overflow-hidden group cursor-pointer">
                 <i className="ri-user-smile-line"></i>
                 <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-sm font-medium transition-all">Upload</div>
               </div>
             </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
               My Resume
             </h3>
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between group hover:border-sky-300 dark:hover:border-sky-700 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-xl">
                      <i className="ri-file-pdf-2-line"></i>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Uploaded_CV.pdf</p>
                   </div>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
               <div className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                 <i className="ri-upload-cloud-2-line text-2xl mb-1"></i>
                 <span className="text-xs font-medium">Upload New Resume</span>
               </div>
             </div>
           </div>
        </div>

        {/* Right Column: Full Form */}
        <div className="xl:col-span-2">
           <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
             
             <div className="p-6 border-b border-slate-100 dark:border-slate-800">
               <h3 className="font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                   <input type="text" value={personalInfo.firstName} onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                   <input type="text" value={personalInfo.lastName} onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                   <input type="email" disabled value={personalInfo.email} className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                   <input type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                 </div>
               </div>
             </div>

             <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/10">
               <h3 className="font-bold text-slate-900 dark:text-white mb-4">Professional Details</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Job Title</label>
                   <input type="text" value={personalInfo.title} onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                   <input type="text" value={personalInfo.location} onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                 </div>
               </div>
             </div>

             <div className="p-6 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
               <button type="submit" disabled={loading} className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center gap-2">
                 {loading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-line"></i>} Save Changes
               </button>
             </div>
           </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
