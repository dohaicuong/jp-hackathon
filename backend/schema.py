import graphene, jwt
import models as models
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from graphql import GraphQLError


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
    all_accounts = SQLAlchemyConnectionField(Account)
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


class UserLoginInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)


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
                user = models.User(
                    name=employee.name, role=employee.role, branch=branch
                )
                users.append(user)

                models.db.session.add(user)
                models.db.session.commit()

            return EmployeesAddPayload(employees=users)


def generate_token(email, password):
    import random, hashlib

    s = email + password + str(random.random())
    return hashlib.sha256(s.encode()).hexdigest()


def encode(password):
    secret = "bi mat khong cho ai biet"
    return jwt.encode({"some": password}, secret, algorithm="HS256")


def decode(password):
    secret = "bi mat khong cho ai biet"
    return jwt.decode(password, secret, algorithms=["HS256"])["some"]


class Signup(graphene.Mutation):
    class Arguments:
        input = UserSignupInput(required=True)

    Output = AuthPayload

    def mutate(self, info, input):
        account = models.Account.query.filter_by(email=input.email).first()
        if account is not None:
            raise GraphQLError("Email already existed")

        token = generate_token(input.email, input.password)
        account = models.Account(
            email=input.email, password=encode(input.password), token=token
        )

        models.db.session.add(account)
        models.db.session.commit()

        return AuthPayload(token=token)


class Login(graphene.Mutation):
    class Arguments:
        input = UserLoginInput(required=True)

    Output = AuthPayload

    def mutate(self, info, input):
        account = models.Account.query.filter_by(email=input.email).first()
        if account is None:
            raise GraphQLError("Email not exists")

        if decode(account.password) != input.password:
            raise GraphQLError("Incorrect password")

        return AuthPayload(token=account.token)


class Mutation(graphene.ObjectType):
    organisation_add = OrganisationAdd.Field()
    division_add = DivisionAdd.Field()
    branch_add = BranchAdd.Field()
    employee_add = EmployeeAdd.Field()
    employees_add = EmployeesAdd.Field()
    signup = Signup.Field()
    login = Login.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
