import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from '../feature/Navbar';
import { Footer } from '../feature/Footer';
import { authService } from '../../lib/api';

interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'job_seeker' | 'employer';
  userName: string;
  userEmail: string;
  userSubtitle?: string; // Company size/industry or current title
  avatarUrl?: string;
}

export function DashboardLayout({ children, userType, userName, userEmail, userSubtitle, avatarUrl }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const seekerLinks: SidebarItem[] = [
    { name: 'Dashboard', path: '/dashboard/job-seeker', icon: 'ri-dashboard-line' },
    { name: 'My Applications', path: '/applications', icon: 'ri-file-list-3-line' },
    { name: 'Saved Jobs', path: '/saved-jobs', icon: 'ri-heart-line' },
    { name: 'Job Alerts', path: '/alerts', icon: 'ri-notification-3-line' },
    { name: 'Profile Settings', path: '/settings/profile', icon: 'ri-user-settings-line' },
    { name: 'Change Password', path: '/settings/password', icon: 'ri-lock-password-line' },
  ];

  const employerLinks: SidebarItem[] = [
    { name: 'Dashboard', path: '/dashboard/employer', icon: 'ri-dashboard-line' },
    { name: 'My Jobs', path: '/employer/jobs', icon: 'ri-briefcase-line' },
    { name: 'Post a Job', path: '/employer/jobs/new', icon: 'ri-add-line' },
    { name: 'Applications', path: '/employer/applications', icon: 'ri-file-list-3-line' },
    { name: 'Review Applications', path: '/employer/applications/review', icon: 'ri-mail-send-line' },
    { name: 'Candidates', path: '/employer/candidates', icon: 'ri-group-line' },
    { name: 'Company Profile', path: '/employer/profile', icon: 'ri-building-line' },
    { name: 'Settings', path: '/employer/settings', icon: 'ri-settings-4-line' },
  ];

  const links = userType === 'employer' ? employerLinks : seekerLinks;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar isAuthenticated={true} userType={userType} />

      <div className="flex-1 flex max-w-[90rem] mx-auto w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8 gap-6 relative z-10">
        
        {/* Mobile Sidebar Toggle Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-[280px] bg-white dark:bg-slate-900 border-r lg:border lg:rounded-2xl border-slate-200 dark:border-slate-800 z-50 lg:z-auto transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-2xl lg:shadow-md lg:shadow-slate-200/50 dark:lg:shadow-none overflow-y-auto custom-scrollbar`}>
          
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            {/* Mobile Close */}
            <button className="lg:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white" onClick={() => setSidebarOpen(false)}>
              <i className="ri-close-line text-2xl"></i>
            </button>
            
            {/* Profile Card */}
            <div className="flex flex-col items-center text-center mt-4 lg:mt-0">
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-3xl text-sky-500 mb-3 overflow-hidden">
                 {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : <i className={userType === 'employer' ? "ri-building-4-line" : "ri-user-line"}></i>}
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{userName}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate w-full">{userEmail}</p>
              {userSubtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{userSubtitle}</p>}
              
              <Link to={userType === 'employer' ? "/employer/profile" : "/settings/profile"} className="mt-4 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="p-4 flex-1">
             <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-2">Menu</div>
             <nav className="space-y-1">
               {links.map((link) => {
                 const isActive = location.pathname === link.path;
                 return (
                   <Link
                     key={link.name}
                     to={link.path}
                     className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                       isActive 
                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                     }`}
                     onClick={() => setSidebarOpen(false)}
                   >
                     <i className={`${link.icon} text-lg ${isActive ? 'text-sky-500' : 'text-slate-400'}`}></i>
                     {link.name}
                   </Link>
                 );
               })}
             </nav>
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
             <button onClick={() => { authService.logout(); window.location.href='/'; }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 cursor-pointer">
                <i className="ri-logout-box-r-line text-lg"></i> Logout
             </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full min-w-0">
          {/* Mobile Sidebar Toggle Button */}
          <div className="lg:hidden mb-4 flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
             <span className="font-bold text-slate-900 dark:text-white">{userType === 'employer' ? 'Employer Dashboard' : 'My Dashboard'}</span>
             <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
               <i className="ri-menu-2-line text-xl"></i>
             </button>
          </div>

          <div className="w-full">
            {children}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
