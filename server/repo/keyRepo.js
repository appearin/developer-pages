var knex = require('../knexstore');
var log = require('winston');

const TABLE_NAME = 'keys';

class KeyRepo {

  static saveKey(key, keyOwnerId){
    if(!key){
      return null;
    };

    return knex(TABLE_NAME)
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

  static getOwner(key){
    return knex
    .select('ownerId')
    .from('keys')
    .where('key', '=', key)

    .catch( (error)=> {
      log.log('error', 'Failed to get userId', error);
    });
  }


  static isInDatabase(key, callback){
    this.getOwner(key).then((ownerId)=>{
        if(ownerId === ""){
          callback(false);
          return;
        }
        callback(true);
    });
  }

}

module.exports = KeyRepo;
