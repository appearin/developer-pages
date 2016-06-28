var knexConnection = require('./knexConnection');
var userRepo = require('./repo/userRepo.js')(knexConnection);
var keyRepo = require('./repo/keyRepo.js')(knexConnection);

var KeyGenerator = require('./keygen.js');
var express = require('express');
var bodyParser = require('body-parser');
var log = require('winston');
var app = express();

var jsonParser = bodyParser.json();

log.level = 'debug';

/* Helper functions */

function decodeCredentials(encodedCredentials){
  let decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
  log.log('debug', 'decoded credentials: ', decodedCredentials);

  try{
    return JSON.parse(decodedCredentials);
  } catch(error) {
    log.log('error', error);
    throw new SyntaxError();
  }
}

/* Endpoints */

app.post('/register', jsonParser, (req, res)=> {
  let key;
  let credentials;
  userRepo.saveUser(req.body)
  .then((userId)=> {
    log.log('debug', 'New user got id :%s', userId);
    key = KeyGenerator.generateApiKey();
    credentials = KeyGenerator.createCredentialsFromKey(key);
    return keyRepo.saveKey(key, userId);
  })
  .then(()=> {
    return res.send(credentials);
  })
  .catch((error)=>{
    log.log('error', error);
  });

});

app.post('/key/validate', jsonParser, (req, res)=> {
    let credentials = decodeCredentials(req.body.key);

    let generatedHmac = KeyGenerator.generateHmac(credentials.key);
    if(credentials.hmac !== generatedHmac){
      res.status(404).send('Invalid');
      return;
    }

    keyRepo.isBlocked(credentials.key)
    .then(isBlocked => {
      if(isBlocked){
        res.status(404).send('Blocked');
        return;
      }
      res.send('key is valid');
      });
});

app.post('/key/block', jsonParser, (req, res)=> {
  let credentials = decodeCredentials(req.body.key);
  keyRepo.blockKey(credentials.key)
  .then(()=> {
    res.send('Ok');
  })
  .catch(()=> {
    res.send('Failed');
  });
});

app.post('/key/unblock', jsonParser, (req, res)=> {
  let credentials = decodeCredentials(req.body.key);
  keyRepo.unblockKey(credentials.key)
  .then(()=> {
    res.send('Ok');
  })
  .catch(()=> {
    res.send('Failed');
  });
});

app.post('/user', jsonParser, (req, res)=> {
  let credentials = decodeCredentials(req.body.key);

  userRepo.getUser(credentials.key)
  .then((user)=> {
    res.send(user);
  })
  .catch((error)=> {
    log.log('error', 'error when getting key owner', error);
    res.status(500).send('Internal server error');
  });
});
;

/* Middleware */

function syntaxErrorHandler(err, req, res, next){
  if(err instanceof SyntaxError){
    log.log('error', err);
    res.status(400).send('Malformed request');
  }
  else{
      next(err);
  }
}

function typeErrorHandler(err, req, res, next){
  if(err instanceof TypeError){
    log.log('error', err);
    res.status(400).send('Invalid contents');
  }
  else{
      next(err);
  }
}

app.use(express.static("public"));
app.use(express.static("build"));
app.use(syntaxErrorHandler);
app.use(typeErrorHandler);


app.listen(9090, ()=>{
  log.log('info', 'Server started...');
});
