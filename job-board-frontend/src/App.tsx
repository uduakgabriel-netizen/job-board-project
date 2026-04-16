import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home/page';
import { JobsPage } from './pages/jobs/page';
import { LoginPage } from './pages/login/page';
import { AccountTypeSelectionPage } from './pages/register/page';
import { RegisterJobSeekerPage } from './pages/register/job-seeker/page';
import { RegisterEmployerPage } from './pages/register/employer/page';
import { ForgotPasswordPage } from './pages/forgot-password/page';
import { ResetPasswordPage } from './pages/reset-password/page';
import { VerifyEmailPage } from './pages/verify-email/page';
import { EmployerPendingPage } from './pages/employer/pending/page';
import { JobSeekerOnboardingPage } from './pages/onboarding/job-seeker/page';
import { EmployerOnboardingPage } from './pages/onboarding/employer/page';
import { JobSeekerDashboard } from './pages/dashboard/job-seeker/page';
import { EmployerDashboard } from './pages/dashboard/employer/page';
import { JobSeekerApplications } from './pages/applications/page';
import { ManagedJobsPage } from './pages/employer/jobs/page';
import { ApplicationReviewPage } from './pages/employer/applications/page';
import { JobSeekerProfileSettings } from './pages/settings/profile/page';
import { EmployerProfileSettings } from './pages/employer/profile/page';
import { CreateJobPage } from './pages/employer/jobs/new/page';
import { JobDetailsPage } from './pages/jobs/details/page';
import { JobApplicationPage } from './pages/jobs/apply/page';
import { ApplicationSuccessPage } from './pages/jobs/success/page';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<AccountTypeSelectionPage />} />
        <Route path="/register/job-seeker" element={<RegisterJobSeekerPage />} />
        <Route path="/register/employer" element={<RegisterEmployerPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        
        {/* Protected Endpoints */}
        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
          <Route path="/employer/pending" element={<EmployerPendingPage />} />
          <Route path="/onboarding/employer" element={<EmployerOnboardingPage />} />
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<ManagedJobsPage />} />
          <Route path="/employer/jobs/new" element={<CreateJobPage />} />
          <Route path="/employer/applications" element={<ApplicationReviewPage />} />
          <Route path="/employer/profile" element={<EmployerProfileSettings />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['job_seeker']} />}>
          <Route path="/onboarding/job-seeker" element={<JobSeekerOnboardingPage />} />
          <Route path="/dashboard/job-seeker" element={<JobSeekerDashboard />} />
          <Route path="/applications" element={<JobSeekerApplications />} />
          <Route path="/settings/profile" element={<JobSeekerProfileSettings />} />
          <Route path="/jobs/:id/apply" element={<JobApplicationPage />} />
          <Route path="/jobs/:id/success" element={<ApplicationSuccessPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
