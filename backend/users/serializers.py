from rest_framework import serializers

from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

from .models import User


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'last_name', 'first_name', "is_teacher", "is_student", 'avatar')


class TokenSerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField()
    user = StringSerializer(many=False)

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_detail')

    

    def get_user_detail(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        last_name = serializer_data.get('last_name')
        first_name = serializer_data.get('first_name')
        userId = serializer_data.get('id')
        is_teacher = serializer_data.get('is_teacher')
        is_student = serializer_data.get('is_student')
        avatar = serializer_data.get("avatar")
        return {
            'last_name': last_name,
            'first_name': first_name,
            'userId': userId,
            'is_student': is_student,
            'is_teacher': is_teacher,
            'avatar': avatar,
        }

class CustomRegisterSerializer(RegisterSerializer):
    is_teacher = serializers.BooleanField()
    last_name = serializers.CharField()
    first_name = serializers.CharField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'last_name',
                  'firstname')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'first_name': self.validated_data.get('first_name', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.last_name = self.cleaned_data.get('last_name')
        user.first_name = self.cleaned_data.get('first_name')
        user.save()
        adapter.save_user(request, user, self)
        return user