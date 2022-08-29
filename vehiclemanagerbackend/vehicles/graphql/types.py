from graphene_django import DjangoObjectType
from vehicles.models import Vehicle


class VehicleType(DjangoObjectType):
  class Meta:
    model = Vehicle

