from rest_framework.routers import DefaultRouter
from api.views import (
    AnnouncementViewSet,
    LevelViewSet,
    ClassroomViewSet,
    UserProfileViewSet,
    SchoolyearViewSet,
    EnrollmentViewSet,
    CoverViewSet,
    ModuleViewSet,
    PrivateUserProfileViewSet,
    QuizViewSet,
    QuestionViewSet,
    ChoiceViewSet,
    GradedQuizViewSet,
    ClassroomQuizListViewSet,
    MessageViewSet
)

router = DefaultRouter()
router.register(r'announcements', AnnouncementViewSet, basename="announcements")
router.register(r'classrooms', ClassroomViewSet, basename="classrooms")
router.register(r'levels',LevelViewSet, basename="levels")
router.register(r'user', UserProfileViewSet, basename="profiles")
router.register(r'schoolyears', SchoolyearViewSet, basename="schoolyear")
router.register(r'enrollments', EnrollmentViewSet, basename="enrollments")
router.register(r'covers', CoverViewSet, basename='covers')
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'self', PrivateUserProfileViewSet, basename='self')
router.register(r'quizzes', QuizViewSet, basename='quizzes')
router.register(r'questions', QuestionViewSet, basename='questions')
router.register(r'choices', ChoiceViewSet, basename="choices")
router.register(r'grades', GradedQuizViewSet, basename="grades")
router.register(r'classroom_quiz', ClassroomQuizListViewSet, basename="classroom_quiz")
router.register(r'messages', MessageViewSet, basename="messages")
urlpatterns = router.urls