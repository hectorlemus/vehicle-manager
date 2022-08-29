import graphene
from graphql_jwt.decorators import login_required
from vehicles.graphql.types import VehicleType
from vehicles.models import Vehicle, Vehicle_Register


class CreateVehicle(graphene.Mutation):
  class Arguments:
    plates = graphene.String(required=True)
    lat = graphene.String(required=True)
    lng = graphene.String(required=True)

  vehicle = graphene.Field(VehicleType)

  @login_required
  def mutate(self, info, plates, lat, lng):
    user= info.context.user

    vehicle: Vehicle = Vehicle(plates=plates, lat=lat, lng=lng)
    vehicle.save()
    
    register = Vehicle_Register(vehicle=vehicle, user=user)
    register.save()
    
    return CreateVehicle(vehicle=vehicle)

