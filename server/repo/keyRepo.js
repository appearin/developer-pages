var log = require('winston');

const TABLE_KEYS = 'keys';

class KeyRepo {

  constructor(knex){
    this.knex = knex;
  }

  saveKey(key, keyOwnerId){
    if(!key){
      throw new Error('Key must be supplied');
    };
    if(!keyOwnerId){
      throw new Error('Key owner must be supplied');
    }

    log.log('debug', 'Saving changekey on userId: %j as owner', keyOwnerId);

    return this.knex(TABLE_KEYS)
    .insert({
      key: key,
      userId: keyOwnerId
    })
    .catch((error)=> {
      log.log('error', 'Failed to save user', error);
      return Promise.reject('Could not save user');
    });
  }

  getKeys(userId){
    return this.knex
    .select('key')
    .from('keys')
    .where('ownerId', '=', userId)
    .catch( (error)=> {
      log.log('error', 'Failed get users keys', error);
    });
  }

  getUserId(key){
    return this.knex
    .select('ownerId')
    .from('keys')
    .where('key', '=', key)
    .catch( (error)=> {
      log.log('error', 'Failed to get userId', error);
    });
  }


  isInDatabase(key, callback){
    this.getOwner(key).then((ownerId)=> {
        if(ownerId === ""){
          callback(false);
          return;
        }
        callback(true);
    });
  }

}

module.exports = (function(connection) {
  return new KeyRepo(connection);
});
