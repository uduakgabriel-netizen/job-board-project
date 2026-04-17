import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../lib/api';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = authService.isAuthenticated();
  const currentRole = authService.getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentRole && !allowedRoles.includes(currentRole)) {
    // Redirect to their own dashboard if role mismatch
    if (currentRole === 'employer') return <Navigate to="/dashboard/employer" replace />;
    return <Navigate to="/dashboard/job-seeker" replace />;
  }

  return <Outlet />;
}
