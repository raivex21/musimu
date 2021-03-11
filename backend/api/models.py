from django.db import models
from django.utils import timezone
from users.models import User
from PIL import Image


class Level(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Schoolyear(models.Model):
    start_year = models.IntegerField()
    end_year = models.IntegerField()

    def __str__(self):
        return str(self.start_year) + "-" + str(self.end_year)


class Classroom(models.Model):
    name = models.CharField(max_length=20)
    teacher_id = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="classrooms", null=True)
    level_id = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True)
    school_year_id = models.ForeignKey(Schoolyear, on_delete=models.SET_NULL, null=True)
    schedule = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    isActive = models.BooleanField(default=True)
    students = models.ManyToManyField(User, through='Enrollment')
    cover = models.ForeignKey('api.Cover', on_delete=models.SET_NULL, blank=True, null=True)


    def __str__(self):
        return self.name


class Announcement(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
    classroom_id = models.ForeignKey(Classroom, on_delete=models.CASCADE, null=True, blank=True)
    isGlobal = models.BooleanField(default=False)
    date_posted = models.DateTimeField(default=timezone.now)
    author_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return self.name

class Enrollment(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrolled')
    classroom_id = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='enrolled_classrooms')
    date_enrolled = models.DateTimeField(default=timezone.now)
        
    def __str__(self):
        return self.student_id.username

class Cover(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(default="/covers/default.jpg", upload_to="covers")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Cover, self).save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.width > 400 or img.height> 300:
            output_size = (400, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Module(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    module = models.FileField(upload_to="modules")
    level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True, blank=True)
    created = models.DateTimeField(default=timezone.now)
    uploader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

