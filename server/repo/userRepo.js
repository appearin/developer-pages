var log = require('winston');

const TABLE_NAME = 'users';

class UserRepo {

  constructor(knex){
    this.knex = knex;
  }

  saveUser(user){
    if(!this.isValid(user)){
      return Promise.reject('Cannot save invalid user');
    }

    return this.knex(TABLE_NAME)
    .insert({
      user: user.name,
      email: user.email,
      domain: user.domain
    })
    .returning('id')
    .catch(function(error){
      log.log('error', "Could not save user", error);
    });
  };

  isValid(user){
    if(!user){
      log.log('debug', 'No user info found ');
      return false;
    }
    if(!user.name){
      log.log('debug', 'No name found');
      return false;
    }
    if(!user.email){
      log.log('debug', 'No email found');
      return false;
    }
    if(!user.domain){
      log.log('debug', 'No domain found');
      return false;
    }
    return true;
  };

}

module.exports = UserRepo;
