const log = require('winston');
const assert = require('assert');

const TABLE_KEYS = 'keys';

class KeyRepo {

  constructor(knex){
    this.knex = knex;
  }

  saveKey(key, keyOwnerId){
    assert.ok(key, 'key is not provided');
    assert.ok(keyOwnerId, 'owner of key is not provided');

    log.log('debug', 'Saving changekey on userId: %j as owner', keyOwnerId);

    return this.knex(TABLE_KEYS)
    .insert({
      key: key,
      userId: keyOwnerId,
      blocked: false
    })
    .catch((error)=> {
      return Promise.reject(error);
    });
  }

  getKey(key){
    assert.ok(key, 'key is not provided');

    return this.knex
    .select('*')
    .from(TABLE_KEYS)
    .where('key', '=', key);
  }

  updateKeyBlock(key, blockValue){
    assert.ok(key, 'key is not provided');

    return this.knex(TABLE_KEYS)
    .where('key', '=', key)
    .update({blocked: blockValue})
    .catch((error)=> {
      return Promise.reject(error);
    });
  }

  blockKey(key){
    return this.updateKeyBlock(key, true);
  }

  unblockKey(key){
    return this.updateKeyBlock(key, false);
  }

  isBlocked(key){
    return this.getKey(key)
    .then((result) => {
      if(!result){
        return Promise.resolve(true);
      }

      let isBlocked = result[0].blocked;
      return Promise.resolve(isBlocked);
    })
    .catch((error)=> {
      return Promise.reject(error);
    });
  }

}

module.exports = (function(connection) {
  return new KeyRepo(connection);
});
