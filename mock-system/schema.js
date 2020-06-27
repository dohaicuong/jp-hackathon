const { gql } = require('apollo-server')

module.exports = gql`
  scalar Frequency # cron expression format https://crontab.guru/
  scalar Answer # either optionId or String(for optional response)
  scalar DateTime # ISO string format YYYY-MM-DDThh:mm:ss.sssZ

  interface Node { id: ID! }

  # QUERY

  type Query {
    me: User!
    node(id: ID!): Node
  }

  # MUTATION

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload # done
    login(input: UserLoginInput!): AuthPayload # done

    #organisationCreate(input: OrgCreateInput!): OrgCreatePayload
    
    organisationAdd(input: OrganisationAddInput!): OrganisationAddPayload # done
    divisionAdd(input: DivisionAddInput!): DivisionAddPayload # done
    branchAdd(input: BranchAddInput!): BranchAddPayload # done
    employeeAdd(input: EmployeeAddInput!): EmployeeAddPayload # done
    employeesAdd(input: EmployeesAddInput!): EmployeesAddPayload # done

    questionCreate(input: QuestionCreateInput!): QuestionCreatePayload

    taskCreate(input: TaskCreateInput!): TaskCreatePayload

    reportSend(input: ReportSendInput!): ReportSendPayload
  }

  input UserSignupInput {
    email: String!
    password: String!
    #name: String!
    #role: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  # input OrgCreateInput {
  #   orgName: String!
  #   divisionNames: [String!]
  #   brancheNames: [String!]
  # }
  # type OrgCreatePayload {
  #   organisation: Organisation
  # }

  input OrganisationAddInput {
    token: String!
    name: String!
  }
  type OrganizationAddPayload {
    organisation: Organisation
  }

  input DivisionAddInput {
    organisationId: ID!

    name: String!
  }
  type DivisionAddPayload {
    division: Division
  }

  input BranchAddInput {
    divisionId: ID!

    name: String!
  }
  type BranchAddPayload {
    branch: Branch
  }

  input EmployeeAddInput {
    branchId: ID!

    name: String!
    role: String!
  }
  type EmployeeAddPayload {
    employee: User
  }

  input EmployeeEntryInput {
    name: String!
    role: String!
  }
  input EmployeesAddInput {
    branchId: ID!

    employees: [EmployeeEntryInput!]
  }
  type EmployeesAddPayload {
    employees: [User]
  }

  input QuestionCreateInput {
    question: String!
    isMultiple: Boolean!
    isOptionalResponse: Boolean!

    options: [QuestionOptionInput!]
  }
  input QuestionOptionInput {
    label: String
    logo: String
  }
  type QuestionCreatePayload {
    question: Question
  }

  input TaskCreateInput {
    frequencies: [Frequency!]
    questionIds: [ID!]
    userIds: [ID!]
  }
  type TaskCreatePayload {
    task: NotificationQuestion
  }

  input ReportSendInput {
    questionId: ID!
    answer: Answer
  }
  type ReportSendPayload {
    report: Report
  }

  # MODELS
  type Account implements Node {
    id: ID!
    email: String!
    password: String!
    token: String!
    organisation: Organisation!
    # user: User!
  }

  type Organisation implements Node {
    id: ID!
    name: String!
    admin: Account!

    divisions: [Division!]
  }

  type Division implements Node {
    id: ID!
    name: String!

    organisation: Organisation!
    branches: [Branch!]
  }

  type Branch implements Node {
    id: ID!
    name: String!

    division: Division!
    employees: [User!]
  }

  type User implements Node {
    id: ID!
    name: String!
    role: String!

    branch: Branch!
    account: Account
    notification: Notification
  }

  type Notification implements Node {
    id: ID!
    version: Int!
    notificationQuestion: [NotificationQuestion!]
  }

  type NotificationQuestion implements Node {
    id: ID!
    notification: Notification!
    frequency: Frequency!
    question: Question!
  }

  type Question implements Node {
    id: ID!

    question: String!
    options: [QuestionOption!]

    isMultiple: Boolean!
    isOptionalResponse: Boolean!

    notificationQuestion: [NotificationQuestion!]
  }
  type QuestionOption implements Node {
    id: ID!
    label: String
    logo: String
  }

  type Report implements Node {
    id: ID!
    
    question: Question!
    user: User!

    answer: Answer!
    createdAt: DateTime!
  }
`