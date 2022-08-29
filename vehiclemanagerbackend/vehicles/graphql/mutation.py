import graphene

from .mutations.create_vehicle import CreateVehicle
from .mutations.delete_vehicle import DeleteVehicle
from .mutations.edit_vehicle import EditVehicle


class Mutation(graphene.ObjectType):
  create_vehicle = CreateVehicle.Field()
  edit_vehicle = EditVehicle.Field()
  delete_vehicle = DeleteVehicle.Field()

