const Repo = require('../database/user-repository');
const roleRepository = require('../database/role-repository');
var UserRepo = new Repo();
var roleRepo = new roleRepository();

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
    }
});

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
        },
        roles: {
            type: new GraphQLList(RoleType),
            resolve: (parent) => {
                return roleRepo.findByUserId(parent.id);
            }
        }
    }
});

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