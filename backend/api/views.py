#from django.shortcuts import render

# Create your views here.
from api.models import (
    Announcement,
    Level,
    Schoolyear,
    Enrollment,
    Classroom,
    Cover,
    Module
)
from api.serializers import (
    AnnouncementSerializer,
    LevelSerializer,
    SchoolyearSerializer,
    EnrollmentSerializer,
    ClassroomSerializer,
    UserProfileSerializer,
    CoverSerializer,
    ModuleSerializer,
    PrivateUserProfileSerializer
)

from users.models import User

from rest_framework import viewsets, permissions

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    http_method_names = ['get']
    
class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer

class SchoolyearViewSet(viewsets.ModelViewSet):
    queryset = Schoolyear.objects.all()
    serializer_class = SchoolyearSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class CoverViewSet(viewsets.ModelViewSet):
    queryset = Cover.objects.all()
    serializer_class = CoverSerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer


class PrivateUserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = PrivateUserProfileSerializer
    # queryset = User.objects.all()
    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)
    http_method_names = ['get','put']