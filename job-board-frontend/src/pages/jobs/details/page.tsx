import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../../../mocks/jobs';
import { Navbar } from '../../../components/feature/Navbar';
import { Footer } from '../../../components/feature/Footer';

export function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find(j => j.id === id) || mockJobs[0]; // fallback for demo

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
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={true} userType="job_seeker" />
      
      <main className="flex-1 pt-24 pb-20 w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 font-medium transition-colors mb-6 cursor-pointer w-fit"
        >
          <i className="ri-arrow-left-line"></i> Back to jobs
        </button>

        {/* Hero Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 mb-8 shadow-md shadow-slate-200/50 dark:shadow-none transition-colors duration-300 relative overflow-hidden">
          {/* bg ornament */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-sky-100/50 to-transparent dark:from-sky-900/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl text-slate-400 dark:text-slate-500 shadow-sm">
                <i className={job.logo}></i>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><i className="ri-building-4-line"></i> {job.company}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="flex items-center gap-1.5"><i className="ri-map-pin-2-line"></i> {job.location}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="flex items-center gap-1.5"><i className="ri-time-line"></i> Posted {job.postedAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
               <button 
                 onClick={() => navigate(`/jobs/${job.id}/apply`)}
                 className="px-8 py-3.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-medium rounded-xl transition-all shadow-md shadow-sky-500/20 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
               >
                 Apply Now <i className="ri-send-plane-fill"></i>
               </button>
               <button className="px-8 py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                 <i className="ri-heart-add-line"></i> Save Job
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
               <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h2>
               <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4">
                 <p>
                   We are looking for a highly skilled and motivated {job.title} to join our dynamic team at {job.company}. In this role, you will be responsible for leading the design and development of our core product architecture. You’ll work closely with cross-functional teams including product managers, designers, and backend engineers to continuously improve the user experience.
                 </p>
                 <p>
                   Our ideal candidate has a strong background in modern frameworks, a passion for clean code, and the ability to thrive in a fast-paced environment. If you enjoy solving complex problems and building scalable web applications, this position is perfect for you.
                 </p>
               </div>

               <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Responsibilities</h2>
               <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                 <li>Develop, test, and deploy robust, scalable web applications.</li>
                 <li>Collaborate with the design team to ensure flawless UI/UX execution.</li>
                 <li>Optimize applications for maximum speed and scalability.</li>
                 <li>Participate in code reviews and advocate for engineering best practices.</li>
                 <li>Troubleshoot and debug production issues efficiently.</li>
               </ul>

               <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Requirements</h2>
               <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                 <li>Minimum 3+ years of professional software development experience.</li>
                 <li>Proven experience with relevant technologies (e.g. React, Node.js, Typescript).</li>
                 <li>Strong understanding of web performance optimization.</li>
                 <li>Experience with RESTful APIs or GraphQL.</li>
                 <li>Excellent problem-solving and communication skills.</li>
               </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
               <h3 className="font-bold text-slate-900 dark:text-white mb-6">Job Overview</h3>
               <div className="space-y-6">
                 <div>
                   <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Salary Range</span>
                   <span className="font-bold text-slate-900 dark:text-white text-lg">{job.salary}</span>
                 </div>
                 <div>
                   <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">Job Type</span>
                   <span className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getTypeStyle(job.type)}`}>
                     {job.type}
                   </span>
                 </div>
                 <div>
                   <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Location</span>
                   <span className="font-medium text-slate-800 dark:text-slate-200">{job.location}</span>
                 </div>
                 <div>
                   <span className="text-sm text-slate-500 dark:text-slate-400 block mb-1">Date Posted</span>
                   <span className="font-medium text-slate-800 dark:text-slate-200">{job.postedAt}</span>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                 <span className="text-sm text-slate-500 dark:text-slate-400 block mb-3">Required Skills</span>
                 <div className="flex flex-wrap gap-2">
                   {job.tags.map((tag, i) => (
                     <span 
                       key={i} 
                       className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            {/* Application Card */}
            <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl p-8 text-white shadow-lg shadow-sky-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10"></div>
               <h3 className="font-bold text-2xl mb-2 relative z-10">Ready to apply?</h3>
               <p className="text-sky-100 text-sm mb-6 relative z-10">Submit your application directly through our platform to stand out to the hiring team.</p>
               <button 
                 onClick={() => navigate(`/jobs/${job.id}/apply`)}
                 className="w-full py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer relative z-10 active:scale-95"
               >
                 Start Application
               </button>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
