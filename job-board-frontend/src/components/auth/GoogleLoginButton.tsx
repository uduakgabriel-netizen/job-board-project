import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { socialLogin } from '../../services/socialAuth';
import { useState } from 'react';

function GoogleLoginButtonInner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true);
      try {
        const user = await socialLogin('google', codeResponse.code);
        if (user.role === 'employer') {
          navigate('/dashboard/employer');
        } else {
          navigate('/dashboard/job-seeker');
        }
      } catch (error) {
        console.error('Failed to log in with Google', error);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
    flow: 'auth-code',
  });

  return (
    <button
      onClick={() => login()}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
    >
      {loading ? (
        <i className="ri-loader-4-line animate-spin text-xl"></i>
      ) : (
        <i className="ri-google-fill text-xl text-red-500"></i>
      )}
      Continue with Google
    </button>
  );
}

import { GoogleOAuthProvider } from '@react-oauth/google';

export function GoogleLoginButton() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id';
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginButtonInner />
    </GoogleOAuthProvider>
  );
}
