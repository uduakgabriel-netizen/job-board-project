import { DashboardLayout } from '../../components/layout/DashboardLayout';

export function JobSeekerApplications() {
  return (
    <DashboardLayout 
      userType="job_seeker"
      userName="John Doe"
      userEmail="john.doe@example.com"
      userSubtitle="Frontend Developer"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          My Applications <span className="ml-2 px-3 py-0.5 bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 rounded-full text-base font-semibold align-middle">4</span>
        </h1>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-2.5 text-slate-400"></i>
            <input type="text" placeholder="Search applications..." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-slate-900 dark:text-white" />
          </div>
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white outline-none cursor-pointer">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
          <i className="ri-filter-3-line"></i> Filter Events
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Job Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Company</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Applied</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { job: "Frontend Dev", company: "Tech Corp", date: "Jan 15, 2024", status: "reviewed", statusLabel: "Reviewed", color: "blue" },
                { job: "Software Engineer", company: "Meta", date: "Jan 12, 2024", status: "shortlisted", statusLabel: "Shortlisted", color: "emerald" },
                { job: "React Developer", company: "Startup Inc", date: "Jan 10, 2024", status: "pending", statusLabel: "Pending", color: "yellow" },
                { job: "UX Engineer", company: "Design Agency", date: "Jan 05, 2024", status: "rejected", statusLabel: "Rejected", color: "rose" },
              ].map((app, idx) => (
                <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900 dark:text-white block">{app.job}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                       <span className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">{app.company.charAt(0)}</span>
                       {app.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 bg-${app.color}-50 text-${app.color}-600 dark:bg-${app.color}-900/30 dark:text-${app.color}-400 rounded-full text-xs font-semibold`}>
                      {app.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sky-500 hover:text-sky-600 font-medium text-sm border border-sky-100 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-lg transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
