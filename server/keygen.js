const crypto = require('crypto');
var uuid = require('node-uuid');

class KeyGenerator {

  static generate(){
    let key = this.generateApiKey();
    let keyWithHmac =
    {
        key: key,
        hmac: this.generateHmac(key)
    };

    let keyData = new Buffer(JSON.stringify(keyWithHmac)).toString('base64');

    return keyData;
  }

  static generateApiKey() {
    return uuid.v4();
  }
  
  static generateHmac(key){
    let hmac = crypto.createHmac('sha256', 'secret');
    hmac.update(key);
    return hmac.digest('base64');
  }

}

module.exports = KeyGenerator;
