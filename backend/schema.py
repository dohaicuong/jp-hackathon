import graphene
import models as models
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField


##########################
# SQLAlchemy connections #
##########################


class Organisation(SQLAlchemyObjectType):
    class Meta:
        model = models.Organisation
        interfaces = (graphene.relay.Node,)


class Division(SQLAlchemyObjectType):
    class Meta:
        model = models.Division
        interfaces = (graphene.relay.Node,)


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
    all_organizations = SQLAlchemyConnectionField(Organisation)
    all_divisions = SQLAlchemyConnectionField(Division)
    all_branches = SQLAlchemyConnectionField(Branch)
    all_users = SQLAlchemyConnectionField(User)
    branch = graphene.Node.Field(Branch)
    user = graphene.Node.Field(User)


##########
# Inputs #
##########


class OrganisationAddInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class DivisionAddInput(graphene.InputObjectType):
    organisation_id = graphene.ID(required=True)
    name = graphene.String(required=True)


class BranchAddInput(graphene.InputObjectType):
    division_id = graphene.ID(required=True)
    name = graphene.String(required=True)


class EmployeeAddInput(graphene.InputObjectType):
    branch_id = graphene.ID(required=True)
    name = graphene.String(required=True)
    role = graphene.String(required=True)


############
# Payloads #
############


class OrganisationAddPayload(graphene.ObjectType):
    organisation = graphene.Field(lambda: Organisation)


class DivisionAddPayload(graphene.ObjectType):
    division = graphene.Field(lambda: Division)


class BranchAddPayload(graphene.ObjectType):
    branch = graphene.Field(lambda: Branch)


class EmployeeAddPayload(graphene.ObjectType):
    employee = graphene.Field(lambda: User)


############
# MUTATION #
############


class OrganisationAdd(graphene.Mutation):
    class Arguments:
        input = OrganisationAddInput(required=True)

    Output = OrganisationAddPayload

    def mutate(self, info, input):
        organisation = models.Organisation(name=input.name)

        models.db.session.add(organisation)
        models.db.session.commit()

        return OrganisationAddPayload(organisation=organisation)


class DivisionAdd(graphene.Mutation):
    class Arguments:
        input = DivisionAddInput(required=True)

    Output = DivisionAddPayload

    def mutate(self, info, input):
        organisation = graphene.Node.get_node_from_global_id(
            info, input.organisation_id
        )

        if organisation is not None:   
            division = models.Division(name=input.name, organisation=organisation)

            models.db.session.add(division)
            models.db.session.commit()

            return DivisionAddPayload(divisions=division)


class BranchAdd(graphene.Mutation):
    class Arguments:
        input = BranchAddInput(required=True)

    Output = BranchAddPayload

    def mutate(self, info, input):
        division = graphene.Node.get_node_from_global_id(info, input.division_id)

        if division is not None:
            branch = models.Branch(name=input.name, division=division)

            models.db.session.add(branch)
            models.db.session.commit()

            return BranchAddPayload(branch=branch)


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
    organisation_add = OrganisationAdd.Field()
    division_add = DivisionAdd.Field()
    branch_add = BranchAdd.Field()
    employee_add = EmployeeAdd.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
