const roles = [{
    id: 1,
    name: 'manager',
    userId: 1
}, {
    id: 2,
    name: 'supervisor',
    userId: 1
}, {
    id: 3,
    name: 'abc',
    userId: 2
}];

module.exports = class RoleRepository {
    findAll() {
        return roles;
    }

    findByUserId(user_id) {
        var results =[];
        for(var i=0; i< roles.length; i++){
            if(roles[i].userId === user_id){
                results.push(roles[i]);
            }
        }
        return results;
    }

}
