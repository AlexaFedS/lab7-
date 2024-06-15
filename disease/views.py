from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import viewsets, permissions

from .permissions import IsAdminOrReadOnly
from .serializers import DiseaseSerializer, UserSerializer, HistorySerializer, SetDiseaseSerializer, \
    SetDiseaseSerializerUser
from .models import Disease, User, History, SetDisease
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from .filter import DiseaseFilter, StoryFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

# Create your views here.

class DiseaseViewSet(viewsets.ModelViewSet):
    queryset = Disease.objects.all().order_by("name")
    serializer_class = DiseaseSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend, OrderingFilter,)
    filterset_class = DiseaseFilter


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )
    authentication_classes = [SessionAuthentication, BasicAuthentication]

class HistoryViewSet(viewsets.ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    permission_classes = (permissions.AllowAny, )
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    filter_backends = (DjangoFilterBackend, OrderingFilter,)
    filterset_class = StoryFilter

class SetDiseaseViewSetUsers(viewsets.ModelViewSet):
    queryset = SetDisease.objects.all()
    serializer_class = SetDiseaseSerializerUser
    permission_classes = (IsAdminOrReadOnly, )
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

class SetDiseaseViewSet(viewsets.ModelViewSet):
    queryset = SetDisease.objects.all()
    serializer_class = SetDiseaseSerializer
    permission_classes = (permissions.AllowAny, )
    authentication_classes = [SessionAuthentication, BasicAuthentication]

@method_decorator(csrf_protect, name="dispatch")
class CheckAuthView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            isAuthenticated = User.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})

@method_decorator(csrf_protect, name="dispatch")
class auth_view(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data
        username = data["username"] # допустим передали username и password
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('{"status": "ok"}')
        else:
            return HttpResponse("{'status': 'error', 'error': 'login failed'}")

@method_decorator(csrf_protect, name="dispatch")
class RegistrationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format = None):
        data = self.request.data

        username = data["username"]
        password = data["password"]
        email = data["mail"]
        re_password = data["re_password"]

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"})
            else:
                user = User.objects.create_user(username=username, password=password, email=email)
                user.save()
                user = User.objects.get(id=user.id)
                user_profile = User(user=user.id)
                user_profile.save()
                return Response({"success": "User created successfully"})
        else:
            return Response({"error": "Password do not match"})

class LogoutView(APIView):

    def post(self, request, format=None):
        try:
            logout(request)
            return Response({'success': 'Loggout Out'})
        except:
            return Response({'error': 'something went wrong when logging out'})

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

@method_decorator(ensure_csrf_cookie, name="dispatch")
class GerCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({'success': 'CSRF Cookie set'})
