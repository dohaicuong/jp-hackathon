const { gql } = require('apollo-server')

module.exports = gql`
  ## TODO type structure decision
  scalar Frequency

  # QUERY
  type Query {
    org(id: ID!): OrgUnit
    tasks: [NotificationTask!]
  }

  interface Node {
    id: ID!
  }

  # ORG
  type OrgUnit implements Node {
    id: ID!
    name: String!

    orgUnits: [OrgUnit!]
    employees: [User!]
  }

  type User implements Node {
    id: ID!
    name: String!
    role: String!
  }

  # TASK
  type NotificationTask implements Node {
    id: ID!
    questions: [Question!]

    users: [User!]
    frequencies: [Frequency!]
  }

  # QUESTION
  interface Question {
    question: String!
  }

  type RateQuestion implements Node & Question  {
    id: ID!

    question: String!
    options: [RateQuestionOption!]
    answer: ID
  }
  type RateQuestionOption implements Node {
    id: ID!
    label: String!
  }

  type ResponseQuestion implements Node & Question {
    id: ID!

    question: String!
    answer: String
  }
`