from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-prime-local-dev-key'
DEBUG = True
ALLOWED_HOSTS = []
ROOT_URLCONF = 'primevideo.urls'
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware', 'django.middleware.common.CommonMiddleware']
INSTALLED_APPS = ['django.contrib.staticfiles']
TEMPLATES = [{'BACKEND': 'django.template.backends.django.DjangoTemplates', 'DIRS': [BASE_DIR / 'primevideo' / 'templates'], 'APP_DIRS': True, 'OPTIONS': {'context_processors': []}}]
WSGI_APPLICATION = 'primevideo.wsgi.application'
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'primevideo' / 'static']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
