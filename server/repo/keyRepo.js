var knex = require('../dbconfig');

class KeyRepo {

  static saveKey(key, keyOwnerId){
    if(!key){return null}

    return knex('keys')
    .insert({
      key: key,
      ownerId: keyOwnerId
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  static getKey(userId){
    return knex
    .select('key')
    .from('keys')
    .where('ownerId','=',userId)
    .catch( (error)=>{
      console.log(error);
    })
  }

  static getOwner(key){
    return knex
    .select('ownerId')
    .from('keys')
    .where('key','=',key)
    .catch( (error)=>{
      console.log(error);
    })
  }


  static isInDatabase(key, callback){
    this.getOwner(key).then((ownerId)=>{
        console.log("owner: " + ownerId);
        if(ownerId==""){
          callback(false);
          return;
        }
        callback(true);
    })
  }

}

module.exports = KeyRepo;
