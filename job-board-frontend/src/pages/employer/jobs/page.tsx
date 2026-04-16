import { DashboardLayout } from '../../../components/layout/DashboardLayout';

export function ManagedJobsPage() {
  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Job Postings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your active and drafted job listings.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-500/20">
          <i className="ri-add-line"></i> Post a Job
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
         {['Active (8)', 'Draft (2)', 'Closed (5)', 'Archived (3)'].map((tab, idx) => (
           <button key={idx} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
             {tab}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sample Job Card Structure for Employer */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Senior Frontend Developer</h3>
                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-xs font-bold leading-none flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Lagos • Remote</p>

              <div className="flex items-center justify-between py-3 border-y border-slate-100 dark:border-slate-800/80 mb-4">
                 <div className="text-center">
                   <p className="text-xs text-slate-400 font-medium mb-1">Applicants</p>
                   <p className="font-bold text-slate-900 dark:text-white">47</p>
                 </div>
                 <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                 <div className="text-center">
                   <p className="text-xs text-slate-400 font-medium mb-1">Views</p>
                   <p className="font-bold text-slate-900 dark:text-white">1,230</p>
                 </div>
                 <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                 <div className="text-center">
                   <p className="text-xs text-slate-400 font-medium mb-1">Posted</p>
                   <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">Jan 10</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-2 mt-auto">
               <button className="flex-1 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-sm font-bold transition-colors">
                 View Apps
               </button>
               <button className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                 <i className="ri-pencil-line"></i>
               </button>
               <button className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                 <i className="ri-settings-4-line"></i>
               </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
