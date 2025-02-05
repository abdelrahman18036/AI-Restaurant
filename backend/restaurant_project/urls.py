# restaurant_project/urls.py

from django.contrib import admin
from django.urls import path, include
from django.views.static import serve
from django.conf import settings
# add meals url for media files
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('restaurants.urls')),
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]

