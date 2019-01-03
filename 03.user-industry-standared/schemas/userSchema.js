const Repo = require('../database/user-repository');
var UserRepo = new Repo();

/* 1. We start by importing everything we need from the
 *    GraphQL library.
 */
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

/* 2. Instead of defining our whole schema in a string 
 *    or a *.graphql file, we'll define them one by one
 *    using the classes we just imported. For complex 
 *    types like User, we'll use the GraphQLObjectType
 *    class which takes the name, fields, and an optional
 *    description.
 */

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        login: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
            type: new GraphQLNonNull(GraphQLString) 
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});

/* 3. Now the Query root type, where our queries will go.
 *    Queries are defined as fields of this type, which take
 *    a return type and a resolver function.
 *    
 *    For the 'user' query, which take parameters, we have to 
 *    specify the 'args' option, resembling how you configure 
 *    type fields.
 */

const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve: () => {
                return UserRepo.findAll();
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
              },
            resolve: (user, args) => {
                return UserRepo.findById(args.id);
            }
            
        }
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                login: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                firstName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                lastName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (user, args) => {
                return UserRepo.createUser(args);
            }
        }
    }
});

const schema = new GraphQLSchema({
     query: QueryType,
     mutation: MutationType
});

module.exports = schema;