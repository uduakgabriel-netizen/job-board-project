export function LinkedInLoginButton() {
  const handleLinkedInLogin = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/linkedin/callback`;
    const scope = 'r_liteprofile r_emailaddress';
    const state = 'random_state_string_for_security';
    
    const linkedInUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = linkedInUrl;
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-sm cursor-pointer"
    >
      <i className="ri-linkedin-fill text-xl text-[#0a66c2]"></i>
      Continue with LinkedIn
    </button>
  );
}
