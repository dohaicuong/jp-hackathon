import graphene
import models as models
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField


class Branch(SQLAlchemyObjectType):
    class Meta:
        model = models.Branch
        interfaces = (graphene.relay.Node,)


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_branches = SQLAlchemyConnectionField(Branch)
    all_users = SQLAlchemyConnectionField(User)
    branch = graphene.Node.Field(Branch)
    user = graphene.Node.Field(User)


class EmployeeAddInput(graphene.InputObjectType):
    branch_id = graphene.ID(required=True)
    name = graphene.String(required=True)
    role = graphene.String(required=True)


class EmployeeAddPayload(graphene.ObjectType):
    employee = graphene.Field(lambda: User)


class EmployeeAdd(graphene.Mutation):
    class Arguments:
        input = EmployeeAddInput(required=True)

    Output = EmployeeAddPayload

    def mutate(self, info, input):
        branch = graphene.Node.get_node_from_global_id(info, input.branch_id)

        if branch is not None:
            user = models.User(name=input.name, role=input.role, branch=branch)

            models.db.session.add(user)
            models.db.session.commit()

            return EmployeeAddPayload(employee=user)


class Mutation(graphene.ObjectType):
    employee_add = EmployeeAdd.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
