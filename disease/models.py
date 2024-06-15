import datetime

from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(
            username=username,
            email=self.normalize_email(email)
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username,  password=None):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(user_models.AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = MyUserManager()


    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

class Disease(models.Model):
    name = models.CharField(max_length=255, verbose_name="название симптома")
    description = models.CharField(max_length=255, verbose_name="описание симптома")
    doctor = models.CharField(max_length=255, verbose_name="лечащий врач")
    numb = models.DecimalField(default=0, max_digits=8, decimal_places=2, verbose_name="стоимость")

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_receipte = models.DateField(default=datetime.date.today)
    date_discharge = models.DateField(default=datetime.date.today)

class SetDisease(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    story = models.ForeignKey(History, on_delete=models.CASCADE)
    status = models.IntegerField(default=0)
