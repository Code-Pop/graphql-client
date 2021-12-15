module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      // URL to the GraphQL API
      url: 'http://localhost:4000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.gql'],
  },
}