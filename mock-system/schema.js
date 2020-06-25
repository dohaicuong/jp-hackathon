const { gql } = require('apollo-server')

module.exports = gql`
  scalar Frequency
  scalar Answer
  scalar DateTime

  interface Node { id: ID! }

  # QUERY

  type Query {
    me: User!
    node(id: ID!): Node
  }

  # MUTATION

  type Mutation {
    signup(input: UserSignupInput!): AuthPayload
    login(input: UserLoginInput!): AuthPayload

    organisationCreate(input: OrgCreateInput!): OrgCreatePayload

    reportSend(input: ReportSendInput!): ReportSendPayload
  }

  input UserSignupInput {
    email: String!
    password: String!
    name: String!
    role: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input OrgCreateInput {
    orgName: String!
    divisionNames: [String!]
    brancheNames: [String!]
  }
  type OrgCreatePayload {
    organisation: Organisation
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
    user: User!
  }

  type Organisation implements Node {
    id: ID!
    name: String!

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
    tasks: [NotificationTask!]
    account: Account
  }

  type NotificationTask implements Node {
    id: ID!
    questions: [Question!]

    users: [User!]
    frequencies: [Frequency!]
  }

  type Question implements Node {
    id: ID!

    question: String!
    options: [QuestionOption!]

    isMultiple: Boolean!
    isOptionalReponse: Boolean!
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