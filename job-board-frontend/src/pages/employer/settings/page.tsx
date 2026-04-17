import { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';

export function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <DashboardLayout 
      userType="employer"
      userName="Tech Corp"
      userEmail="hr@techcorp.com"
      userSubtitle="Technology • 51-200 employees"
    >
      <div className="mb-6">
         <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
         <p className="text-slate-500 text-sm mt-1">Manage your account credentials, notifications, and security.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden maxWidth-3xl">
         <form onSubmit={handleSave}>
           
           <div className="p-6 border-b border-slate-100 dark:border-slate-800">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Email & Password</h3>
             <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input type="email" defaultValue="hr@techcorp.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500" />
                </div>
             </div>
           </div>

           <div className="p-6 border-b border-slate-100 dark:border-slate-800">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Notification Preferences</h3>
             <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email me when a new candidate applies</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Send me weekly analytics reports</span>
                </label>
             </div>
           </div>

           <div className="p-6 flex items-center justify-start gap-3 bg-slate-50 dark:bg-slate-800/30">
             <button type="submit" disabled={loading} className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors shadow-md shadow-sky-500/20 disabled:opacity-70 flex items-center gap-2">
               {loading ? 'Saving...' : 'Save Changes'}
             </button>
           </div>
         </form>
      </div>
    </DashboardLayout>
  );
}
