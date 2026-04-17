import { useNavigate, Link } from 'react-router-dom';

const mockJobs = [
  {
    id: 'mock-1',
    title: 'Senior Frontend Engineer',
    company_name: 'Paystack',
    location: 'Lagos, Nigeria',
    is_remote: true,
    salary: '1200000',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'mock-2',
    title: 'Product Manager',
    company_name: 'Flutterwave',
    location: 'Lagos, Nigeria',
    is_remote: false,
    salary: '1500000',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id: 'mock-3',
    title: 'Data Analyst',
    company_name: 'Moniepoint',
    location: 'Abuja, Nigeria',
    is_remote: false,
    salary: '800000',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id: 'mock-4',
    title: 'UI/UX Designer',
    company_name: 'PiggyVest',
    location: 'Lagos, Nigeria',
    is_remote: true,
    salary: '950000',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'mock-5',
    title: 'Backend Engineer (Python)',
    company_name: 'Andela',
    location: 'Remote',
    is_remote: true,
    salary: '1300000',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
  },
  {
    id: 'mock-6',
    title: 'Digital Marketing Manager',
    company_name: 'Kuda Bank',
    location: 'Lagos, Nigeria',
    is_remote: false,
    salary: '750000',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
  }
];

export function LatestJobs() {
  const navigate = useNavigate();

  const timeAgo = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4"><i className="ri-fire-line"></i> Latest</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Recommended Jobs</h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-slate-500 dark:text-slate-400 max-w-md md:text-right">Based on your profile and search history. Apply to these roles today.</p>
            <button onClick={() => navigate('/jobs')} className="inline-flex items-center gap-2 text-sky-500 font-medium hover:text-sky-600 transition-colors group whitespace-nowrap cursor-pointer active:scale-95">
              View All Jobs <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map(job => (
            <Link key={job.id} to="/jobs" className="group bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-md shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800/50 flex items-center justify-center text-sky-500 text-2xl group-hover:scale-105 transition-transform"><i className="ri-briefcase-line"></i></div>
                {job.is_remote && <div className="px-3 py-1 rounded-full text-xs font-medium border bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border-sky-100 dark:border-sky-800/50">Remote</div>}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{job.title}</h3>
                <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-2"><i className="ri-building-4-line text-lg"></i><span>{job.company_name}</span></div>
                  <div className="flex items-center gap-2"><i className="ri-map-pin-2-line text-lg"></i><span>{job.location}</span></div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between mt-auto">
                <span className="font-bold text-sky-500">₦{Number(job.salary).toLocaleString()}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><i className="ri-time-line"></i> {timeAgo(job.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
