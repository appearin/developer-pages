var log = require('winston');

const TABLE_USERS = 'users';
const TABLE_KEYS = 'keys';

class UserRepo {

  constructor(knex){
    this.knex = knex;
  }

  saveUser(user){
    if(!this.isValid(user)){
      return Promise.reject('Cannot save invalid user');
    }

    return this.knex(TABLE_USERS)
    .insert({
      name: user.name,
      email: user.email,
      domain: user.domain
    })
    .returning('userId')
    .then(([id]) => {
      return id;
    })
    .catch(function(error){
      return Promise.reject(new Error("Could not save user", error));
      //log.log('error', "Could not save user", error);
    });
  };

  getUser(apiKey){
    if(!apiKey){
      Promise.reject('No key provided');
    }

    return this.knex
    .select('*')
    .from(TABLE_USERS)
    .join(TABLE_KEYS, 'users.userId', 'keys.userId')
    .where('key', apiKey);

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

module.exports = (function(connection) {
  return new UserRepo(connection);
});
