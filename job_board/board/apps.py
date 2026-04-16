from django.apps import AppConfig


class BoardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'board'
<<<<<<< HEAD
=======

    def ready(self):
        import board.signals  # noqa: F401 — register signal handlers
>>>>>>> 3ddb219 (frontend integration)
