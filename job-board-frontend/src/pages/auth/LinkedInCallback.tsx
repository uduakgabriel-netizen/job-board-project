import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { socialLogin } from '../../services/socialAuth';

export function LinkedInCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errParam = searchParams.get('error');

    if (errParam) {
      setError('LinkedIn authorization failed or was cancelled.');
      return;
    }

    if (code) {
      socialLogin('linkedin', code)
        .then((user) => {
          if (user.role === 'employer') {
            navigate('/dashboard/employer');
          } else {
            navigate('/dashboard/job-seeker');
          }
        })
        .catch(() => {
          setError('Failed to authenticate with LinkedIn. Please try again.');
        });
    } else {
      setError('No authorization code provided by LinkedIn.');
    }
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            <i className="ri-error-warning-fill"></i>
          </div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">Authentication Error</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <i className="ri-linkedin-fill text-6xl text-[#0a66c2] mb-6 animate-pulse"></i>
      <div className="w-8 h-8 border-4 border-[#0a66c2]/30 border-t-[#0a66c2] rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400 font-medium tracking-wide">
        Completing login with LinkedIn...
      </p>
    </div>
  );
}
