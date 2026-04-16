"""
TASK #10: Email Notifications

Sends email to applicant when their application status changes
to 'accepted' or 'rejected'.
"""

import logging
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from .models import Application

logger = logging.getLogger('board')


@receiver(pre_save, sender=Application)
def notify_applicant_on_status_change(sender, instance, **kwargs):
    """
    When an Application's status changes from 'pending'/'reviewed'
    to 'accepted' or 'rejected', email the applicant.
    """
    # Skip if this is a brand-new application (no pk yet)
    if instance.pk is None:
        return

    try:
        previous = Application.objects.get(pk=instance.pk)
    except Application.DoesNotExist:
        return

    # Only send if status actually changed
    if previous.status == instance.status:
        return

    # Only notify on final status changes
    if instance.status not in ('accepted', 'rejected'):
        return

    applicant = instance.applicant
    job = instance.job

    if not applicant.email:
        logger.warning(
            f"Cannot send notification to {applicant.username} — no email on file."
        )
        return

    # Build the email
    if instance.status == 'accepted':
        subject = f"🎉 Great news! Your application for '{job.title}' was accepted"
        message = (
            f"Hi {applicant.first_name or applicant.username},\n\n"
            f"Congratulations! Your application for the position of "
            f"'{job.title}' at {job.company.name} has been ACCEPTED.\n\n"
            f"The employer may reach out to you soon with next steps.\n\n"
            f"Best of luck!\n"
            f"— The Job Board Team"
        )
    else:  # rejected
        subject = f"Update on your application for '{job.title}'"
        message = (
            f"Hi {applicant.first_name or applicant.username},\n\n"
            f"Thank you for your interest in the position of "
            f"'{job.title}' at {job.company.name}.\n\n"
            f"Unfortunately, the employer has decided to move forward "
            f"with other candidates at this time.\n\n"
            f"Don't be discouraged — keep applying!\n\n"
            f"Best,\n"
            f"— The Job Board Team"
        )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[applicant.email],
            fail_silently=False,
        )
        logger.info(
            f"Sent '{instance.status}' notification to {applicant.email} "
            f"for job '{job.title}'"
        )
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
