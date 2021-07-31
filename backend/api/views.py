#from django.shortcuts import render
from django_filters import rest_framework as filters
# Create your views here.
from api.models import (
    Announcement,
    Level,
    Schoolyear,
    Enrollment,
    Classroom,
    Cover,
    Module,
    Quiz,
    Choice,
    Question,
    Messages,
    GradedQuiz,
    ClassroomQuizList,
    Task,
    Condtion,
    SubCategory,
    Category,
    Board,
    BoardMessages,
    Convo,
    ConvoMessage,
    Lesson,
    LessonStep,
    GradedTask
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
    PrivateUserProfileSerializer,
    QuizSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    GradedQuizSerializer,
    ClassroomQuizListSerializer,
    MessageSerializer,
    TaskSerializer,
    ConditionSerializer,
    SubCategorySerializer,
    CategorySerializer,
    BoardMessagesSerializer,
    BoardSerializer,
    ConvoSerializer,
    ConvoMessageSerializer,
    LessonSerializer,
    LessonStepSerializer,
    GradedTaskSerializer,

)

from users.models import User
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, generics


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
    filter_backends = [filters.DjangoFilterBackend]
    filter_fields = ('teacher_id', 'students__id')
    


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

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

class GradedQuizViewSet(viewsets.ModelViewSet):
    queryset = GradedQuiz.objects.all()
    serializer_class = GradedQuizSerializer

class ClassroomQuizListViewSet(viewsets.ModelViewSet):
    queryset = ClassroomQuizList.objects.all()
    serializer_class = ClassroomQuizListSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Messages.objects.all()
    serializer_class = MessageSerializer



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filter_fields = ('sub_cat__name', 'cat__name', 'name', 'grade_level')


class ConditionViewSet(viewsets.ModelViewSet):
    queryset = Condtion.objects.all()
    serializer_class = ConditionSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class BoardMessagesViewSet(viewsets.ModelViewSet):
    queryset = BoardMessages.objects.all()
    serializer_class = BoardMessagesSerializer

class ConvoViewSet(viewsets.ModelViewSet):
    queryset = Convo.objects.all()
    serializer_class = ConvoSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filter_fields = ('user1', 'user2')

class ConvoMessageViewSet(viewsets.ModelViewSet):
    queryset = ConvoMessage.objects.all()
    serializer_class = ConvoMessageSerializer

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class LessonStepViewSet(viewsets.ModelViewSet):
    queryset = LessonStep.objects.all()
    serializer_class = LessonStepSerializer

class GradedTaskViewSet(viewsets.ModelViewSet):
    queryset = GradedTask.objects.all()
    serializer_class = GradedTaskSerializer