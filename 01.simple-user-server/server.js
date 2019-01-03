const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Repo = require('./database/user-repository');
var UserRepo = new Repo();
// Construct a schema, using GraphQL schema language
/* 1. We start by defining our schema using the buildSchema()
 *    helper function. It takes a GraphQL-compliant string
 *    and produces its JavaScript equivalent.
 */
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

/* 2. Next up, we need something that will produce the value of
 *    the hello query when we call it. Resolvers are the ones
 *    responsible for this, and for this example, we define them
 *    in a simple object, named after the query.
 */

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
      return 'Hello world!';
    },
    users: () => {
        return UserRepo.findAll();
    },
    user: (body) => {
        return UserRepo.findById(body.id);
    },
    createUser: (user) => {
        return UserRepo.createUser(user);
    }
  };

const app = express();

/* 3. We add GraphQL to our Express server... 
 */
app.use('/graphql', graphqlHTTP({
    schema,             // .. using our schema
    rootValue: root,    // .. and our resolvers
    graphiql: true,     // .. and the GraphiQL editor - wait for it!
}));

app.listen(4001);

console.log("Running express server on localhost:4001");