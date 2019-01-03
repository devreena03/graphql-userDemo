const { request } = require('graphql-request')

module.exports = class UserService {
  allUsers(){
    var query = `{
      users { 
        id 
        firstName 
      } 
    }`
  
    request('http://localhost:4001/graphql', query).then(data => {
      console.log(data);
    });
  }
}