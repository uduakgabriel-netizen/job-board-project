from rest_framework import permissions


class IsEmployer(permissions.BasePermission):
    """Custom permission to allow only Employers to post/update jobs."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "employer"


class IsJobSeeker(permissions.BasePermission):
    """Only Job Seekers can apply for jobs."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "job_seeker"


class IsAdminUser(permissions.BasePermission):
    """Only admin-role users (not just Django staff)."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role == "admin" or request.user.is_staff
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission: only the owner of the job (employer)
    or an admin can edit/delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Admin can do anything
        if request.user.is_staff or request.user.role == "admin":
            return True
        # Owner check — the employer who created the job
        return obj.employer == request.user
