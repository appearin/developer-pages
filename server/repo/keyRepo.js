var log = require('winston');

const TABLE_NAME = 'keys';

class KeyRepo {

  constructor(knex){
    this.knex = knex;
  }

  saveKey(key, keyOwnerId){
    if(!key){
      throw new Error("Key must be supplied");
    };

    return this.knex(TABLE_NAME)
    .insert({
      key: key,
      ownerId: keyOwnerId
    })
    .catch((error)=> {
      log.log('error', 'Failed to save user', error);
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

module.exports = KeyRepo;
