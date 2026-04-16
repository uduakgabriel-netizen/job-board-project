import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { JobCard } from '../../home/components/JobCard';
import { mockJobs } from '../../../mocks/jobs';
import { Link } from 'react-router-dom';

export function JobSeekerDashboard() {
  const recommendedJobs = mockJobs.slice(0, 4);

  return (
    <DashboardLayout 
      userType="job_seeker"
      userName="John Doe"
      userEmail="john.doe@example.com"
      userSubtitle="Frontend Developer"
    >
      {/* Welcome Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 mb-6 shadow-md shadow-slate-200/50 dark:shadow-none">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Good morning, John!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Here is what is happening with your job search today.</p>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
           <div className="flex justify-between items-end mb-2">
             <span className="font-semibold text-slate-700 dark:text-slate-300">Profile Completion</span>
             <span className="text-sky-500 font-bold">75%</span>
           </div>
           <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
             <div className="bg-sky-500 h-full rounded-full" style={{ width: '75%' }}></div>
           </div>
           <Link to="/onboarding/job-seeker" className="text-sm font-medium text-sky-500 hover:text-sky-600 flex items-center gap-1">
             Complete your profile to increase your chances <i className="ri-arrow-right-s-line"></i>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-500 flex items-center justify-center text-2xl">
             <i className="ri-send-plane-line"></i>
           </div>
           <div>
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Applications Sent</p>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12</h3>
           </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center text-2xl">
             <i className="ri-calendar-event-line"></i>
           </div>
           <div>
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Interviews</p>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3</h3>
           </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center text-2xl">
             <i className="ri-medal-line"></i>
           </div>
           <div>
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Job Matches</p>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">45</h3>
           </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="mb-8">
         <div className="flex justify-between items-end mb-4">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Jobs</h2>
           <Link to="/jobs" className="text-sky-500 hover:text-sky-600 font-medium text-sm">View All</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {recommendedJobs.map((job: any) => (
             <JobCard key={job.id} job={job} />
           ))}
         </div>
      </div>

      {/* Recent Applications */}
      <div>
         <div className="flex justify-between items-end mb-4">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h2>
           <Link to="/applications" className="text-sky-500 hover:text-sky-600 font-medium text-sm">View All</Link>
         </div>
         <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                   <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job Title</th>
                   <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Company</th>
                   <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied On</th>
                   <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                   <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                   <td className="px-6 py-4">
                     <span className="font-semibold text-slate-900 dark:text-white block">Frontend Developer</span>
                   </td>
                   <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Tech Corp</td>
                   <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Jan 15, 2024</td>
                   <td className="px-6 py-4">
                     <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold">Reviewed</span>
                   </td>
                   <td className="px-6 py-4">
                     <button className="text-slate-400 hover:text-sky-500 transition-colors"><i className="ri-eye-line text-lg"></i></button>
                   </td>
                 </tr>
                 <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                   <td className="px-6 py-4">
                     <span className="font-semibold text-slate-900 dark:text-white block">React Engineer</span>
                   </td>
                   <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Startup Inc</td>
                   <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Jan 10, 2024</td>
                   <td className="px-6 py-4">
                     <span className="px-3 py-1 bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold">Pending</span>
                   </td>
                   <td className="px-6 py-4">
                     <button className="text-slate-400 hover:text-sky-500 transition-colors"><i className="ri-eye-line text-lg"></i></button>
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
      </div>
    </DashboardLayout>
  );
}
