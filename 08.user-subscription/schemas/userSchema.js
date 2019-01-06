const { makeExecutableSchema } = require('graphql-tools');
const  resolvers  = require("../resolvers/userResolver");

var typeDefs = `
type User {
    id: Int!           # non-nullable integer
    login: String!     # non-nullable string
    firstName: String! 
    lastName: String!
}
type Query {   
    hello: String

    users: [User]

     user(id: Int!): User
}
type Mutation {
    createUser(firstName: String, lastName: String!, login: String!): User
  }
# The subscription root type, specifying what we can subscribe to
type Subscription {
    userAdded: User    # subscription operation.
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports =  schema;