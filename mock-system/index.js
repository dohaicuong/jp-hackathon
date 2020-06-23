const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs: require('./schema'),
  mocks: true,
  onHealthCheck: () => {
    return new Promise(resolve => {
      resolve()
    })
  }
})

server
  .listen(4000)
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
    console.log(`health check at: ${url}.well-known/apollo/server-health`)
  })