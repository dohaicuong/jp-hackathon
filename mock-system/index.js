const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const app = express()

const server = new ApolloServer({
  typeDefs: require('./schema'),
  mocks: true,
})

app.get('/graphql/server-health', (req, res) => {
  res.status(200).send({"status":"pass" })
})

server.applyMiddleware({ app, path: '/graphql' })

app
  .listen({ port: 4000 }, () => {
    console.log(`🚀  Server ready at ${server.graphqlPath}`)
    console.log(`health check at: ${server.graphqlPath}/.well-known/apollo/server-health`)
  })