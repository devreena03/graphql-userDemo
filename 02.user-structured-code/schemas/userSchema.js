const { buildSchema } = require('graphql');
var schema = buildSchema(`
type User {
    id: Int!           # non-nullable integer
    login: String!     # non-nullable string
    firstName: String! 
    lastName: String!
}
"The root of it all."
type Query {   
    "Returns a greeting"
    hello: String

    "Returns a list of users."
    users: [User]

    "Returns a single user matching an ID."
     user(id: Int!): User
}
type Mutation {
    createUser(firstName: String, lastName: String!, login: String!): User
  }
`);

module.exports = schema;