import { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';

export function EmployerProfileSettings() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Company Profile</h1>
           <p className="text-slate-500 text-sm mt-1">Manage your brand identity, overview, and contact info.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
         <form onSubmit={handleSave}>
           
           {/* Section 1 */}
           <div className="p-6 border-b border-slate-100 dark:border-slate-800">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6">Brand Identity</h3>
             
             <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
               <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Company Logo</p>
                  <div className="w-28 h-28 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center justify-center text-indigo-500 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                    <i className="ri-building-4-line text-3xl mb-1"></i>
                    <span className="text-xs font-medium">Change Logo</span>
                  </div>
               </div>
               <div className="flex-1 w-full">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Cover Image Banner</p>
                  <div className="w-full h-28 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                    <i className="ri-image-add-line text-2xl mb-1"></i>
                    <span className="text-xs font-medium">Upload banner image for company page</span>
                  </div>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                   <input type="text" defaultValue="Tech Corp" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Website</label>
                   <input type="url" defaultValue="https://techcorp.example.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" />
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Overview</label>
                   <textarea rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 custom-scrollbar" defaultValue="We are a leading technology firm building cloud-native infrastructure solutions for modern enterprises..."></textarea>
                 </div>
             </div>
           </div>

           {/* Section 2 */}
           <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/10">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6">Hiring & Cultural Info</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Industry</label>
                   <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none">
                     <option value="tech">Technology</option>
                     <option value="finance">Finance</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Size</label>
                   <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 appearance-none">
                     <option value="51-200">51-200 employees</option>
                   </select>
                 </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Perks & Benefits Offered</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Health Insurance', 'Remote Work', 'Gym Membership', 'Paid Time Off'].map(s => (
                    <span key={s} className="pl-3 pr-2 py-1.5 rounded-lg bg-indigo-100/50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-medium flex items-center gap-1 border border-indigo-200 dark:border-indigo-800/50">
                      {s} <i className="ri-close-line cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full p-0.5"></i>
                    </span>
                  ))}
                  <button type="button" className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-transparent text-slate-500 dark:text-slate-400 text-sm hover:border-indigo-500 hover:text-indigo-500 transition-colors cursor-pointer">
                    + Add Benefit
                  </button>
                </div>
             </div>
           </div>

           {/* Submit */}
           <div className="p-6 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-800/30">
             <button type="submit" disabled={loading} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-md shadow-indigo-500/20 disabled:opacity-70 flex items-center gap-2">
               {loading ? <i className="ri-loader-4-line animate-spin"></i> : <i className="ri-save-line"></i>}
               Save Company Profile
             </button>
           </div>

         </form>
      </div>

    </DashboardLayout>
  );
}
