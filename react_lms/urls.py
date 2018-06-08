'''
URL definitions
'''

from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.conf import settings

from . import views
from views import CoursewareIndexAPI


urlpatterns = [

    # UI Templates
    url(r'^$', views.react_lms_home, name='edx-figures-home'),
    url(
        r'^courses/{}/courseware/?$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        CoursewareIndexAPI.as_view(),
        name='courseware',
    ),
    url(
        r'^courses/{}/courseware/(?P<chapter>[^/]*)/$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        CoursewareIndexAPI.as_view(),
        name='courseware_chapter',
    ),
    url(
        r'^courses/{}/courseware/(?P<chapter>[^/]*)/(?P<section>[^/]*)/$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        CoursewareIndexAPI.as_view(),
        name='courseware_section',
    ),
    url(
        r'^courses/{}/courseware/(?P<chapter>[^/]*)/(?P<section>[^/]*)/(?P<position>[^/]*)/?$'.format(
            settings.COURSE_ID_PATTERN,
        ),
        CoursewareIndexAPI.as_view(),
        name='courseware_position',
    ),
    #$url('', RedirectView.as_view(pattern_name='react-lms-home'), name="catch-all")
]
