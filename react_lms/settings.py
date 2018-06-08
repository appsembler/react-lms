import os

from django.conf import settings as django_settings

# Specity the package directory
APP_DIR = os.path.dirname(os.path.abspath(__file__))

# Define our webpack asset bundling constants
WEBPACK_BUNDLE_DIR_NAME = 'react_lms_bundles/'
WEBPACK_STATS_FILE = os.path.abspath(
    os.path.join(APP_DIR, '../frontend/webpack-stats.json'))

# This will raise an AttributeError if WEBPACK_LOADER is not defined in settings
# We'll just let it fail
django_settings.WEBPACK_LOADER.update(REACT_LMS_APP={
    'BUNDLE_DIR_NAME': WEBPACK_BUNDLE_DIR_NAME,
    'STATS_FILE': WEBPACK_STATS_FILE
    })

# Add settings here. These are for operational defaults
REACT_LMS = {
    'APP_DIR': APP_DIR,
}
