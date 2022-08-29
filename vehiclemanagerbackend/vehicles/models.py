from django.contrib.auth.models import User
from django.db import models


class Vehicle(models.Model):
  plates = models.CharField(max_length=10, blank=False, null=False, unique=True)
  lat = models.CharField(max_length=50, blank=False, null=False)
  lng = models.CharField(max_length=50, blank=False, null=False)


class Vehicle_Register(models.Model):
  vehicle = models.ForeignKey(Vehicle, null=False, on_delete=models.CASCADE)
  user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

