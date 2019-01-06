const users = [{
    id: 1,
    login: 'some@test.com',
    firstName: 'Some',
    lastName: 'User'
}, {
    id: 2,
    login: 'test123@test.com',
    firstName: 'Another',
    lastName: 'User'
}];

module.exports = class UserRepository {
    findAll() {
        return users;
    }

    findById(id) {
        for(var i=0; i< users.length; i++){
            if(users[i].id === id){
                return users[i];
            }
        }
    }

    createUser(user) {
        console.log(user);
        user.id =3;
        users.push(user);
        return user;
    }
}
