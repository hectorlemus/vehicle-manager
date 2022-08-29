import graphene
from vehicles.graphql.mutation import Mutation as VehiclesMutations
from vehicles.graphql.query import Query as VehiclesQuery

from .auth.graphql.mutation import Mutation as AuthMutation


class Query(VehiclesQuery, graphene.ObjectType):
  pass


class Mutation(AuthMutation, VehiclesMutations, graphene.ObjectType):
  pass


schema = graphene.Schema(query=Query, mutation=Mutation)

