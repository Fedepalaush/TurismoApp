const axios = require ('axios');

var UserService= {
    getUsers: function() {
        return axios.get ('https://randomuser.me/api/');
    }
}
export {UserService as default};