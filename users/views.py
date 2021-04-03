from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from .models import User
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    # queryset = User.objects.all()
    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)
    



class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter