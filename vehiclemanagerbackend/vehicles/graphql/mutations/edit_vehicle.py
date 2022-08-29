import graphene
from graphql_jwt.decorators import login_required
from vehicles.graphql.types import VehicleType
from vehicles.models import Vehicle


class EditVehicle(graphene.Mutation):
  class Arguments:
    id = graphene.ID()
    plates = graphene.String(required=True)
    lat = graphene.String(required=True)
    lng = graphene.String(required=True)

  vehicle = graphene.Field(VehicleType)

  @login_required
  def mutate(self, info, id, plates, lat, lng):
    vehicle: Vehicle = Vehicle.objects.get(pk=id)

    if vehicle is None:
      return EditVehicle(vehicle=None)

    vehicle.plates = plates
    vehicle.lat = lat
    vehicle.lng = lng
    vehicle.save()
    return EditVehicle(vehicle=vehicle)

