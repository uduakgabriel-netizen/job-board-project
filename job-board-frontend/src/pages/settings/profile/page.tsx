import { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';

export function JobSeekerProfileSettings() {
  const [loading, setLoading] = useState(false);

  // Mock initial state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 800 000 0000',
    title: 'Senior Frontend Developer',
    location: 'Lagos, Nigeria'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DashboardLayout 
      userType="job_seeker"
      userName={`${personalInfo.firstName} ${personalInfo.lastName}`}
      userEmail={personalInfo.email}
      userSubtitle={personalInfo.title}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
           <p className="text-slate-500 text-sm mt-1">Manage your personal information, CV, and preferences.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-medium transition-colors cursor-pointer text-sm hidden sm:block shadow-md">
          View Public Profile
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Quick Edits & Resume */}
        <div className="xl:col-span-1 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Profile Picture</h3>
             <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-lg flex items-center justify-center text-4xl text-slate-400 relative overflow-hidden group cursor-pointer">
                 <i className="ri-user-smile-line"></i>
                 <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-sm font-medium transition-all">
                   Upload
                 </div>
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 text-center">JPG or PNG no larger than 5MB</p>
             </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
               My Resume <i className="ri-pencil-line text-sky-500 cursor-pointer"></i>
             </h3>
             <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between group hover:border-sky-300 dark:hover:border-sky-700 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-xl">
                      <i className="ri-file-pdf-2-line"></i>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">John_Doe_Frontend_CV.pdf</p>
                      <p className="text-xs text-slate-500">Updated 2 months ago</p>
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
                 <div className="sm:col-span-2">
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Professional Summary</label>
                   <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 custom-scrollbar" placeholder="Briefly describe your experience and goals...">Experienced frontend developer with a passion for building beautiful, responsive, and highly functional user interfaces using React and modern CSS.</textarea>
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
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Years of Experience</label>
                   <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 appearance-none">
                     <option value="5-8">Senior Level (5-8 years)</option>
                     <option value="3-5">Mid Level (3-5 years)</option>
                   </select>
                 </div>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">My Skills</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['React', 'TypeScript', 'Tailwind', 'Node.js'].map(s => (
                      <span key={s} className="pl-3 pr-2 py-1.5 rounded-lg bg-sky-100/50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 text-sm font-medium flex items-center gap-1 border border-sky-200 dark:border-sky-800/50">
                        {s} <i className="ri-close-line cursor-pointer hover:bg-sky-200 dark:hover:bg-sky-800 rounded-full p-0.5"></i>
                      </span>
                    ))}
                    <button type="button" className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-transparent text-slate-500 dark:text-slate-400 text-sm hover:border-sky-500 hover:text-sky-500 transition-colors cursor-pointer">
                      + Add Item
                    </button>
                  </div>
               </div>
             </div>

             <div className="p-6 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
               <button type="button" className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 font-medium transition-colors cursor-pointer">
                 Cancel
               </button>
               <button type="submit" disabled={loading} className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center gap-2">
                 {loading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-line"></i>}
                 Save Changes
               </button>
             </div>
           </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
