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


class Account(SQLAlchemyObjectType):
    class Meta:
        model = models.Account
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_organizations = SQLAlchemyConnectionField(Organisation)
    all_divisions = SQLAlchemyConnectionField(Division)
    all_branches = SQLAlchemyConnectionField(Branch)
    all_users = SQLAlchemyConnectionField(User)
    all_account = SQLAlchemyConnectionField(Account)
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


class EmployeeEntryInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    role = graphene.String(required=True)


class EmployeesAddInput(graphene.InputObjectType):
    branch_id = graphene.ID(required=True)
    employees = graphene.List(EmployeeEntryInput)


class UserSignupInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
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


class EmployeesAddPayload(graphene.ObjectType):
    employees = graphene.List(lambda: User)


class AuthPayload(graphene.ObjectType):
    token = graphene.String(required=True)
    user = graphene.Field(lambda: User)


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

            return DivisionAddPayload(division=division)


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


class EmployeesAdd(graphene.Mutation):
    class Arguments:
        input = EmployeesAddInput(required=True)

    Output = EmployeesAddPayload

    def mutate(self, info, input):
        branch = graphene.Node.get_node_from_global_id(info, input.branch_id)

        if branch is not None:
            users = []
            for employee in input.employees:
                user = models.User(name=employee.name, role=employee.role, branch=branch)
                users.append(user)

                models.db.session.add(user)
                models.db.session.commit()

            return EmployeesAddPayload(employees=users)


class Signup(graphene.Mutation):
    class Arguments:
        input = UserSignupInput(required=True)

    Output = AuthPayload

    def mutate(self, info, input):
        token=None
        user=None
        return AuthPayload(token=token, user=user)

class Mutation(graphene.ObjectType):
    organisation_add = OrganisationAdd.Field()
    division_add = DivisionAdd.Field()
    branch_add = BranchAdd.Field()
    employee_add = EmployeeAdd.Field()
    employees_add = EmployeesAdd.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
