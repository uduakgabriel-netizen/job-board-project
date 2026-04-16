import { DashboardLayout } from '../../../components/layout/DashboardLayout';

export function ApplicationReviewPage() {
  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
        {/* Left Panel: App List */}
        <div className="w-full md:w-1/3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
             <h2 className="font-bold text-slate-900 dark:text-white mb-3">Applications</h2>
             <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white cursor-pointer mb-2">
               <option>All Jobs</option>
               <option>Senior Frontend Developer</option>
               <option>UI/UX Designer</option>
             </select>
             <div className="relative">
                <i className="ri-search-line absolute left-3 top-2 text-slate-400"></i>
                <input type="text" placeholder="Search applicant..." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
             {/* Selected applicant card */}
             <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 cursor-pointer">
               <div className="flex justify-between items-start mb-1">
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white">John Doe</h4>
                 <span className="text-xs font-medium text-slate-500">Jan 15</span>
               </div>
               <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Senior Frontend Developer</p>
               <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded text-[10px] font-bold uppercase tracking-wider">Pending</span>
             </div>

             {/* Unselected applicant card */}
             <div className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border border-transparent transition-colors">
               <div className="flex justify-between items-start mb-1">
                 <h4 className="font-bold text-sm text-slate-900 dark:text-white">Jane Smith</h4>
                 <span className="text-xs font-medium text-slate-500">Jan 14</span>
               </div>
               <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Senior Frontend Developer</p>
               <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 rounded text-[10px] font-bold uppercase tracking-wider">Reviewed</span>
             </div>
          </div>
        </div>

        {/* Right Panel: Details */}
        <div className="w-full md:w-2/3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-800/30">
              <div className="flex gap-4">
                 <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400 shrink-0">
                   JD
                 </div>
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">John Doe</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Applied for: <span className="text-slate-900 dark:text-white">Senior Frontend Developer</span></p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm text-slate-500 flex items-center gap-1"><i className="ri-mail-line"></i> john.doe@example.com</span>
                      <span className="text-sm text-slate-500 flex items-center gap-1"><i className="ri-phone-line"></i> +234 800 000 0000</span>
                    </div>
                 </div>
              </div>
              <div className="flex gap-2">
                 <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer">
                   <option value="pending">Move to: Pending</option>
                   <option value="reviewed">Move to: Reviewed</option>
                   <option value="shortlist">Move to: Shortlisted</option>
                   <option value="accept">Move to: Accepted</option>
                   <option value="reject">Move to: Rejected</option>
                 </select>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              {/* Cover Letter */}
              <div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><i className="ri-file-text-line text-indigo-500"></i> Cover Letter</h3>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                   <p>Dear Hiring Manager,</p><br/>
                   <p>I am excited to apply for the Senior Frontend Developer position at Tech Corp. With over 5 years of experience building scalable React applications, I believe I can bring immediate value to your team...</p>
                 </div>
              </div>

              {/* Resume & Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><i className="ri-attachment-line text-indigo-500"></i> Resume</h3>
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-xl">
                            <i className="ri-file-pdf-2-line"></i>
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">john_doe_resume.pdf</p>
                            <p className="text-xs text-slate-500">1.2 MB</p>
                         </div>
                      </div>
                      <i className="ri-download-2-line text-slate-400 group-hover:text-indigo-500 text-xl transition-colors"></i>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><i className="ri-radar-line text-indigo-500"></i> Skills Match</h3>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">82% Match</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {['React', 'TypeScript', 'Tailwind'].map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded">{skill}</span>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>

              {/* Internal Notes */}
              <div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><i className="ri-edit-2-line text-indigo-500"></i> Internal Notes</h3>
                 <textarea rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white custom-scrollbar mb-3" placeholder="Add private notes about this candidate..."></textarea>
                 <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold transition-transform active:scale-95">Save Note</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
