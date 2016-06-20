var knex = require('../knexstore');

class UserRepo {

  static saveUser(user){
    if(!this.isValid(user)){
      return Promise.reject('Cannot save invalid user');
    }

    return knex('users')
    .insert({
      user: user.name,
      email: user.email,
      domain: user.domain
    })
    .returning('id')
    .catch(function(error){
        console.log(error);
    });
  };

  static isValid(user){
    if(!user || !user.name || !user.email || !user.domain){
      return false;
    }
    return true;
  };

}

module.exports = UserRepo;
