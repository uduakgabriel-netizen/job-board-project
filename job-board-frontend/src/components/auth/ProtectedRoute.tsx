import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: Array<'job_seeker' | 'employer' | 'admin'>;
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  // In a real app with JWT layout, we'd pull these from our context.
  const isAuthenticated = true; // localStorage.getItem('access_token') !== null;
  const currentRole = 'job_seeker'; // Parse JWT to determin role

  if (!isAuthenticated) {
    // Optionally redirect and prompt login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole as any)) {
    // Unauthorized
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
