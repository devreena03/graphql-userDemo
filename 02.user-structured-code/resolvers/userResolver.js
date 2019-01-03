const Repo = require('../database/user-repository');
var UserRepo = new Repo();

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

  module.exports = root;