import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Col */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer transition-all duration-300 active:scale-95 inline-flex">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              J
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white transition-colors duration-300">
              Job<span className="text-sky-500">-Board</span>
            </span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300 leading-relaxed">
            Connecting talented professionals with the best opportunities across Nigeria and beyond.
          </p>
          <div className="flex gap-3">
            {[
              { icon: 'ri-twitter-x-line', link: '#' },
              { icon: 'ri-linkedin-fill', link: '#' },
              { icon: 'ri-instagram-line', link: '#' },
              { icon: 'ri-facebook-circle-fill', link: '#' }
            ].map((social, idx) => (
              <a key={idx} href={social.link} className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-slate-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-300 cursor-pointer active:scale-95">
                <i className={`${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* For Seekers */}
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">For Job Seekers</h3>
          <ul className="space-y-4">
            {['Browse Jobs', 'Companies', 'Salary Calculator', 'Career Advice', 'Create Resume'].map(link => (
              <li key={link}>
                <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Employers */}
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">For Employers</h3>
          <ul className="space-y-4">
            {['Post a Job', 'Browse Candidates', 'Pricing Packages', 'Employer Dashboard', 'Recruitment Services'].map(link => (
              <li key={link}>
                <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Company</h3>
          <ul className="space-y-4">
            {['About Us', 'Contact Us', 'Terms of Service', 'Privacy Policy', 'FAQ'].map(link => (
              <li key={link}>
                <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 cursor-pointer">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
          © {new Date().getFullYear()} Job-Board. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
          <i className="ri-map-pin-line text-sky-500"></i>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
