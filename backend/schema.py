import graphene
import models as models
from utils import encode, decode, generate_token
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


class Question(SQLAlchemyObjectType):
    class Meta:
        model = models.Question
        interfaces = (graphene.relay.Node,)


class QuestionOption(SQLAlchemyObjectType):
    class Meta:
        model = models.QuestionOption
        interfaces = (graphene.relay.Node,)


class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    all_organizations = SQLAlchemyConnectionField(Organisation)
    all_divisions = SQLAlchemyConnectionField(Division)
    all_branches = SQLAlchemyConnectionField(Branch)
    all_users = SQLAlchemyConnectionField(User)
    all_accounts = SQLAlchemyConnectionField(Account)
    all_questions = SQLAlchemyConnectionField(Question)
    all_question_options = SQLAlchemyConnectionField(QuestionOption)

    organisations = graphene.List(Organisation)
    divisions = graphene.List(Division)
    branches = graphene.List(Branch)
    users = graphene.List(User)
    accounts = graphene.List(Account)
    questions = graphene.List(Question)
    question_optionss = graphene.List(QuestionOption)

    organisation = graphene.Node.Field(Organisation)
    division = graphene.Node.Field(Division)
    branch = graphene.Node.Field(Branch)
    user = graphene.Node.Field(User)
    acount = graphene.Node.Field(Account)
    question = graphene.Node.Field(Question)
    question_option = graphene.Node.Field(QuestionOption)

    me = graphene.Field(Account) 

    def resolve_organisations(self, info):
        return models.Organisation.query.all()

    def resolve_divisions(self, info):
        return models.Division.query.all()    

    def resolve_branches(self, info):
        return models.Branch.query.all()

    def resolve_users(self, info):
        return models.User.query.all()

    def resolve_accounts(self, info):
        return models.Account.query.all()

    def resolve_questions(self, info):
        return models.Question.query.all()

    def resolve_question_options(self, info):
        return models.QuestionOption.query.all()

    def resolve_me(self, info):
        token = info.context.headers.get('Authorization').split(" ")[1]
        account = models.Account.query.filter_by(token=token).first()
        if account is not None:
            return account


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


class QuestionOptionInput(graphene.InputObjectType):
    label = graphene.String(required=True)
    logo = graphene.String(required=True)


class QuestionCreateInput(graphene.InputObjectType):
    question = graphene.String(required=True)
    is_multiple = graphene.Boolean(required=True)
    is_optional_response = graphene.Boolean(required=True)
    options = graphene.List(QuestionOptionInput)


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


class QuestionCreatePayload(graphene.ObjectType):
    question = graphene.Field(lambda: Question)


############
# MUTATION #
############


class OrganisationAdd(graphene.Mutation):
    class Arguments:
        input = OrganisationAddInput(required=True)

    Output = OrganisationAddPayload

    def mutate(self, info, input):
        org = models.Organisation.query.filter_by(name=input.name).first()
        if org is not None:
            raise GraphQLError("The organisation already existed")

        token = info.context.headers.get('Authorization').split(" ")[1]
        admin = models.Account.query.filter_by(token=token).first()
        if admin is None:
            raise GraphQLError("Invalid token")

        if admin.organisation is not None:
            raise GraphQLError("This admin has already assigned for another organisation")

        organisation = models.Organisation(name=input.name)
        models.db.session.add(organisation)
        models.db.session.commit()

        admin.organisation = organisation
        models.db.session.commit()

        return OrganisationAddPayload(organisation=organisation)


class DivisionAdd(graphene.Mutation):
    class Arguments:
        input = DivisionAddInput(required=True)

    Output = DivisionAddPayload

    def mutate(self, info, input):
        organisation = graphene.Node.get_node_from_global_id(info, input.organisation_id)
        if organisation is None:
            raise GraphQLError("Invalid organisation ID")

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
        if division is None:
            raise GraphQLError("Invalid division ID")

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
        if branch is None:
            raise GraphQLError("Invalid branch ID")

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
        if branch is None:
            raise GraphQLError("Invalid branch ID")

        users = []
        for employee in input.employees:
            user = models.User(
                name=employee.name, role=employee.role, branch=branch
            )
            users.append(user)

            models.db.session.add(user)
            models.db.session.commit()

        return EmployeesAddPayload(employees=users)


class Signup(graphene.Mutation):
    class Arguments:
        input = UserSignupInput(required=True)

    Output = AuthPayload

    def mutate(self, info, input):
        account = models.Account.query.filter_by(email=input.email).first()
        if account is not None:
            raise GraphQLError("Email already existed")

        token = generate_token(input.email, input.password)
        account = models.Account(email=input.email, password=encode(input.password), token=token)

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


class QuestionCreate(graphene.Mutation):
    class Arguments:
        input = QuestionCreateInput(required=True)

    Output = QuestionCreatePayload

    def mutate(self, info, input):
        question = models.Question(question=input.question, is_multiple=input.is_multiple, 
            is_optional_response=input.is_optional_response)
        
        question_options = []
        for option in input.options:
            question_option = models.QuestionOption(label=option.label, logo=option.logo)
            question_option.question=question
            question_options.append(question_option)
            models.db.session.add(question_option)

        question.question_options = question_options

        models.db.session.add(question)
        models.db.session.commit()
        
        return QuestionCreatePayload(question=question)


class Mutation(graphene.ObjectType):
    organisation_add = OrganisationAdd.Field()
    division_add = DivisionAdd.Field()
    branch_add = BranchAdd.Field()
    employee_add = EmployeeAdd.Field()
    employees_add = EmployeesAdd.Field()
    signup = Signup.Field()
    login = Login.Field()
    question_create = QuestionCreate.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
