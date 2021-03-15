from rest_framework import serializers
from operator import itemgetter

from api.models import (
    Announcement,
    Level,
    Schoolyear,
    Classroom,
    Announcement,
    Enrollment,
    Cover,
    Module,
    Quiz,
    Choice,
    Question,
    Messages,
    GradedQuiz,
    ClassroomQuizList

)
from users.serializers import UserSerializer
from users.models import User


class StringSerializer(serializers.StringRelatedField):
     def to_internal_value(self, value):
        return value

class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()    

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "is_teacher", 
            "is_student", 
            "email", 
            "nickname", 
            "bio", 
            "last_login", 
            "avatar", 
            "date_joined",
             "full_name"
            )
    def get_full_name(self, obj):
        
        full_name = f'{obj.first_name} {obj.last_name}'
        return full_name

#create another userprofile serializer that will be private and only the current user can access

class PrivateUserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()    

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "is_teacher", 
            "is_student", 
            "email", 
            "nickname", 
            "bio", 
            "last_login", 
            "avatar", 
            "date_joined",
             "full_name"
            )
    def get_full_name(self, obj):
        
        full_name = f'{obj.first_name} {obj.last_name}'
        return full_name


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ("__all__")

class SchoolyearSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schoolyear
        fields = ("__all__")

class ClassroomSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    level_name = serializers.SerializerMethodField()
    school_year_name = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField()


    class Meta:
        model = Classroom
        fields = ("__all__")

    def get_teacher_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.teacher_id
        ).data
        first = first = serializer_data.get('first_name')
        last = serializer_data.get('last_name')
        return first + " " + last


    def get_level_name(self, obj):
        serializer_data = LevelSerializer(
            obj.level_id
        ).data
        level_name = serializer_data.get('name')
        return level_name


    def get_school_year_name(self, obj):
        serializer_data = SchoolyearSerializer(
            obj.school_year_id
        ).data
        school_year_name = serializer_data.get('start_year')
        return school_year_name

    def get_cover_url(self, obj):
        serializer_data = CoverSerializer(
            obj.cover
        ).data
        cover_url = serializer_data.get('image')
        return cover_url

class AnnouncementSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = ("__all__")

    def get_avatar(self, obj):
        serializer_data = UserProfileSerializer(
            obj.author_id
        ).data
        avatar = serializer_data.get('avatar')
        return avatar

    def get_author_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.author_id
        ).data
        first = serializer_data.get('first_name')
        last = serializer_data.get('last_name')
        return first + " " + last

       
class EnrollmentSerializer(serializers.ModelSerializer):
    
    classroom_detail = serializers.SerializerMethodField()
    class Meta:
        model = Enrollment
        fields = ("__all__")
    
    

    def get_classroom_detail(self, obj):
        classroom_detail = ClassroomSerializer(
            obj.classroom_id
        ).data
        
        return classroom_detail



class CoverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cover
        fields =("__all__")



class ModuleSerializer(serializers.ModelSerializer):
    level_name = serializers.SerializerMethodField()
    uploader_name = serializers.SerializerMethodField()
    class Meta:
        model = Module
        fields = ("__all__")

    def get_level_name(self, obj):
        serializer_data = LevelSerializer(
            obj.level
        ).data
        level_name = serializer_data.get("name")
        return level_name
        
    def get_uploader_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.uploader
        ).data
        uploader_name = serializer_data.get("full_name")
        return uploader_name

class QuizSerializer(serializers.ModelSerializer):
    level_name = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ("__all__")
    def get_level_name(self, obj):
        serializer_data = LevelSerializer(
            obj.level
        ).data
        level_name = serializer_data.get("name")
        return level_name
    def get_teacher_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.teacher
        ).data
        teacher_name = serializer_data.get("full_name")
        return teacher_name
    

class QuestionSerializer(serializers.ModelSerializer):
    choices_name = serializers.SerializerMethodField()
    answer_name = serializers.SerializerMethodField()

    class Meta: 
        model = Question
        fields = ("__all__")
    
    def get_choices_name(self, obj):
        serializer_data = ChoiceSerializer(
            obj.choices, many=True
        ).data
        res = list(map(itemgetter('name'), serializer_data))
        choices_name = res
        return choices_name
    
    def get_answer_name(self, obj):
        serializer_data = ChoiceSerializer(
            obj.answer
        ).data
        answer_name = serializer_data.get("name")
        return answer_name

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("__all__")