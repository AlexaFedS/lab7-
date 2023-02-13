"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from disease import views as disease_views
from rest_framework import routers
from disease.views import GerCSRFToken, LogoutView, auth_view, CheckAuthView, RegistrationView

router = routers.DefaultRouter()
router.register(r'diseases', disease_views.DiseaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('authenticated', CheckAuthView.as_view()),
    path('login', auth_view.as_view()),
    path('logout', LogoutView.as_view()),
    path('get_cookie', GerCSRFToken.as_view()),
    path('admin/', admin.site.urls),
    path('registration', RegistrationView.as_view()),
]
