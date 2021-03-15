from django.contrib import admin
from api.models import (
    Level,
    Schoolyear,
    Classroom,
    Announcement,
    Enrollment,
    Cover,
    Module,
    Quiz,
    ClassroomQuizList,
    Choice,
    Messages,
    Question,
    GradedQuiz
)

admin.site.register(Level)
admin.site.register(Schoolyear)
admin.site.register(Classroom)
admin.site.register(Announcement)
admin.site.register(Enrollment)
admin.site.register(Cover)
admin.site.register(Module)
admin.site.register(Quiz)
admin.site.register(ClassroomQuizList)
admin.site.register(Messages)
admin.site.register(Choice),
admin.site.register(Question)
admin.site.register(GradedQuiz)
