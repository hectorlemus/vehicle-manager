import graphene
from graphql_jwt.decorators import login_required
from vehicles.graphql.types import VehicleType
from vehicles.models import Vehicle, Vehicle_Register


class Query(graphene.ObjectType):
  user_vehicles = graphene.List(VehicleType)

  @login_required
  def resolve_user_vehicles(root, info, **kwargs):
    try:
      user = info.context.user
      vehicles = Vehicle_Register.objects.filter(user=user).values('vehicle').values_list('id')
      return Vehicle.objects.filter(pk__in=vehicles)
    except Exception as e:
      print(e)
      return []
