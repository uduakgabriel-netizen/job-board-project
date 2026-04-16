import { useNavigate } from 'react-router-dom';
import { Job } from '../../../mocks/jobs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
      case 'Remote': return 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border-sky-100 dark:border-sky-800/50';
      case 'Hybrid': return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50';
      case 'Part-time': return 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400 border-cyan-100 dark:border-cyan-800/50';
      default: return 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="group cursor-pointer bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 shadow-md shadow-slate-200/50 dark:shadow-none rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-100 dark:hover:shadow-none flex flex-col"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors duration-300 text-2xl group-hover:text-sky-500">
          <i className={job.logo}></i>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeStyle(job.type)} transition-colors duration-300`}>
          {job.type}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
          {job.title}
        </h3>
        <div className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <i className="ri-building-4-line text-lg"></i>
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-map-pin-2-line text-lg"></i>
            <span>{job.location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 rounded-lg text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-800/50 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between transition-colors duration-300 mt-auto">
        <span className="font-bold text-sky-500">{job.salary}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <i className="ri-time-line"></i> {job.postedAt}
        </span>
      </div>
    </div>
  );
}
