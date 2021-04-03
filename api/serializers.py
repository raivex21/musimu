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
    ClassroomQuizList,
    Category,
    SubCategory,
    Task,
    Condtion,
    Board,
    BoardMessages,
    Convo,
    ConvoMessage

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
            "full_name",
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
    students = serializers.SerializerMethodField()



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
    
    def get_students(self, obj):
        serializer_data = UserProfileSerializer(
            obj.students, many=True
        ).data
        students = serializer_data
        return students

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
    questions = serializers.SerializerMethodField()

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

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions
    

class QuestionSerializer(serializers.ModelSerializer):
    choices_data = serializers.SerializerMethodField()
    answer_name = serializers.SerializerMethodField()

    class Meta: 
        model = Question
        fields = ("__all__")
    
    def get_choices_data(self, obj):
        # serializer_data = ChoiceSerializer(
        #     obj.choices, many=True
        # ).data
        # res = list(map(itemgetter('name'), serializer_data))
        # choices_name = res
        serializer_data = ChoiceSerializer(
            obj.choices, many=True
        ).data
        choices_data = serializer_data
        return choices_data
    
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

class GradedQuizSerializer(serializers.ModelSerializer):
    quiz_name = serializers.SerializerMethodField()
    student_name = serializers.SerializerMethodField()
    class Meta:
        model = GradedQuiz
        fields = ("__all__")

    def get_quiz_name(self, obj):
        serializer_data = QuizSerializer(
            obj.quiz
        ).data
        return serializer_data.get('name')
    
    def get_student_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.student
        ).data
        student_name = serializer_data.get("full_name")
        return student_name

class ClassroomQuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassroomQuizList
        fields = ("__all__")


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    receiver_name = serializers.SerializerMethodField()


    class Meta:
        model = Messages
        fields = ("__all__")

    def get_sender_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.sender
        ).data
        sender_name = serializer_data.get("full_name")
        return sender_name

    def get_receiver_name(self, obj):
        serializer_data = UserProfileSerializer(
            obj.receiver
        ).data
        receiver_name = serializer_data.get("full_name")
        return receiver_name



class CategorySerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ("id", "name", "tasks")
    def get_tasks(self, obj):
        serializer_data = TaskSerializer(obj.task_set.all(), many=True).data
        tasks = serializer_data
        return tasks

class SubCategorySerializer(serializers.ModelSerializer):
    


    class Meta:
        model = SubCategory
        fields = ("__all__")

class TaskSerializer(serializers.ModelSerializer):
    conditions = serializers.SerializerMethodField()
    # category_name = serializers.SerializerMethodField()
    subcat_name = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = ("__all__")
    
    def get_conditions(self, obj):
        serializer_data = ConditionSerializer(obj.condtion_set.all(), many=True).data
        return serializer_data

    def get_subcat_name(self, obj):
        serializer_data = SubCategorySerializer(
            obj.sub_cat
        ).data
        subcat_name = serializer_data.get("name")
        return subcat_name

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condtion
        fields = ("__all__")

class BoardSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField()
    classroom_name = serializers.SerializerMethodField()
    class Meta:
        model = Board
        fields = ("__all__")

    def get_messages(self, obj):
        serializer_data = BoardMessagesSerializer(obj.board_message.all(), many=True).data
        return serializer_data
    
    def get_classroom_name(self, obj):
        data = ClassroomSerializer(obj.classroom).data
        return data.get("name")

class BoardMessagesSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()


    class Meta:
        model = BoardMessages
        fields = ("__all__")

    def get_user_name(self, obj):
        data = UserProfileSerializer(obj.user).data
        return data.get("full_name")
    def get_avatar(self, obj):
        data = UserProfileSerializer(obj.user).data
        return data.get("avatar")

class ConvoSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()
    user1_name = serializers.SerializerMethodField()
    user2_name = serializers.SerializerMethodField()

    class Meta:
        model = Convo
        fields = ("__all__")


    def get_users(self, obj):
        users = []
        users.append(obj.user1.id)
        users.append(obj.user2.id)
        return users
    def get_messages(self, obj):
        data = ConvoMessageSerializer(
            obj.convomessage_set.all(), many=True
        ).data
        return data
    def get_user1_name(self, obj):
        data = UserProfileSerializer(
            obj.user1
        ).data
        return data.get("full_name")
    def get_user2_name(self, obj):
        data = UserProfileSerializer(
            obj.user2
        ).data
        return data.get("full_name")

class ConvoMessageSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = ConvoMessage
        fields = ("__all__")

    def get_user_name(self, obj):
        data = UserProfileSerializer(obj.user).data
        return data.get('full_name')
    def get_avatar(self, obj):
        data = UserProfileSerializer(obj.user).data
        return data.get("avatar")
