from django.contrib import admin
from api.models import (
    Level,
    Schoolyear,
    Classroom,
    Announcement,
    Enrollment,
    Cover,
    Module
)

admin.site.register(Level)
admin.site.register(Schoolyear)
admin.site.register(Classroom)
admin.site.register(Announcement)
admin.site.register(Enrollment)
admin.site.register(Cover)
admin.site.register(Module)
