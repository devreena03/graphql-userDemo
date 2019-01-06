const Repo = require('../database/user-repository');
const { PubSub } = require('graphql-subscriptions');
var UserRepo = new Repo();
const pubsub = new PubSub(); //create a PubSub instance
const User_ADDED = 'newUser';

const root = {
    Query: {
        hello: () => {
            console.log('hello');
        return 'Hello world!';
        },
        users: () => {
            return UserRepo.findAll();
        },
        user: (root, body) => {
            console.log(body)
            return UserRepo.findById(body.id);
        }
    },
    Mutation: {
        createUser: (root,user) => {
            var newUser = UserRepo.createUser(user);
            pubsub.publish(User_ADDED, { userAdded: newUser });
            return newUser; 
        }
    },
    Subscription: {
        userAdded: {  
          subscribe: () => pubsub.asyncIterator(User_ADDED)  
        }
    }
  };

  module.exports = root;