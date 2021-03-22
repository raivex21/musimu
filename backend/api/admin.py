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
    GradedQuiz,
    Task,
    Category,
    SubCategory,
    Condtion
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
admin.site.register(Condtion)
admin.site.register(Task)
admin.site.register(SubCategory)
admin.site.register(Category)
