import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Link } from 'react-router-dom';

export function EmployerDashboard() {
  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      {/* Welcome Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 mb-6 shadow-md shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-semibold text-xs rounded-full mb-3 flex items-center gap-1.5 w-fit">
            <i className="ri-shield-check-line text-sm"></i> Verified Company
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, Tech Corp!</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your active listings and review top candidates.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/employer/applications" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-medium transition-colors cursor-pointer text-center">
            View Applications
          </Link>
          <Link to="/employer/jobs/new" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-500/20 text-center">
            <i className="ri-add-line"></i> Post a Job
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Jobs', value: '12', trend: '↑ 2 from last week', trendColor: 'text-emerald-500', icon: 'ri-briefcase-line', bg: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500' },
          { label: 'Applications', value: '347', trend: '↑ 45 from last week', trendColor: 'text-emerald-500', icon: 'ri-file-user-line', bg: 'bg-sky-50 dark:bg-sky-900/30 text-sky-500' },
          { label: 'Views', value: '2.5k', trend: '↑ 12% from last month', trendColor: 'text-emerald-500', icon: 'ri-eye-line', bg: 'bg-purple-50 dark:bg-purple-900/30 text-purple-500' },
          { label: 'Hired', value: '8', trend: '↑ 3 from last month', trendColor: 'text-emerald-500', icon: 'ri-group-line', bg: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500' },
        ].map((metric, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none flex flex-col">
            <div className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center text-xl mb-4`}>
              <i className={metric.icon}></i>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{metric.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{metric.value}</h3>
            <p className={`text-xs font-semibold ${metric.trendColor}`}>{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applications</h2>
            <Link to="/employer/applications" className="text-indigo-500 hover:text-indigo-600 font-medium text-sm">View All</Link>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applicant</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex flex-shrink-0 items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">JD</div>
                        <span className="font-semibold text-slate-900 dark:text-white block whitespace-nowrap">John Doe</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Frontend Dev</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Today</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-semibold">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-500 hover:text-indigo-600 font-medium text-sm">Review</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex flex-shrink-0 items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">JS</div>
                        <span className="font-semibold text-slate-900 dark:text-white block whitespace-nowrap">Jane Smith</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Backend Dev</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Yesterday</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-semibold">Reviewed</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-500 hover:text-indigo-600 font-medium text-sm">Review</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Top Performing Jobs</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none p-6 space-y-6">
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="font-semibold text-slate-900 dark:text-white text-sm">Frontend Developer</span>
                 <span className="text-xs text-slate-500 font-medium">120 apps</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-indigo-500 h-full rounded-full" style={{ width: '85%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="font-semibold text-slate-900 dark:text-white text-sm">UI/UX Designer</span>
                 <span className="text-xs text-slate-500 font-medium">85 apps</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-sky-500 h-full rounded-full" style={{ width: '60%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="font-semibold text-slate-900 dark:text-white text-sm">Product Manager</span>
                 <span className="text-xs text-slate-500 font-medium">42 apps</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
