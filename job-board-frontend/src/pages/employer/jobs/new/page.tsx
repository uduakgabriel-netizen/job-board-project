import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../../../components/layout/DashboardLayout';

export function CreateJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/employer/jobs');
    }, 1500);
  };

  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post a New Job</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Fill in the details to publish a new job listing.</p>
        </div>
        <button 
          onClick={() => navigate('/employer/jobs')}
          className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md shadow-slate-200/50 dark:shadow-none mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Info block */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Title</label>
                <input required type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. Senior Frontend Developer" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Employment Type</label>
                <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Setup</label>
                 <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                   <option>On-site</option>
                   <option>Remote</option>
                   <option>Hybrid</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                 <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. Lagos, Nigeria" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Minimum Salary (Optional)</label>
                 <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. 500,000" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Maximum Salary (Optional)</label>
                 <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. 800,000" />
               </div>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="space-y-6">
             <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Job Details</h3>
             
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Description</label>
               <textarea required rows={5} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Describe the role..."></textarea>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Responsibilities</label>
               <textarea required rows={4} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Bullet points separated by new lines..."></textarea>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Requirements & Qualifications</label>
               <textarea required rows={4} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 custom-scrollbar" placeholder="Bullet points separated by new lines..."></textarea>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Required Skills (Tags)</label>
               <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300" placeholder="e.g. React, Node.js, TypeScript (comma separated)" />
             </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
             <button type="button" onClick={() => navigate('/employer/jobs')} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               Save as Draft
             </button>
             <button 
               type="submit"
               disabled={loading}
               className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-md shadow-indigo-500/20 active:scale-95 disabled:opacity-70 flex items-center gap-2"
             >
               {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : 'Publish Job'}
             </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
