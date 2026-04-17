from allauth.account.signals import user_signed_up
from django.dispatch import receiver

@receiver(user_signed_up)
def populate_profile(request, user, **kwargs):
    if not user.role:
        user.role = 'job_seeker'
        user.save()
