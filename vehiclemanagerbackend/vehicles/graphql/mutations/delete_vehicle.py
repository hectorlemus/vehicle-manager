import graphene
from graphql_jwt.decorators import login_required
from vehicles.models import Vehicle


class DeleteVehicle(graphene.Mutation):
  class Arguments:
    id = graphene.ID()

  deleted = graphene.Boolean()

  @login_required
  def mutate(self, info, id):
    try:
      vehicle: Vehicle = Vehicle.objects.get(pk=id)

      if vehicle is not None:
        vehicle.delete()
        return DeleteVehicle(deleted=True)

      return DeleteVehicle(deleted=False)
    except Exception as e:
      print(e)
      return DeleteVehicle(deleted=False)

