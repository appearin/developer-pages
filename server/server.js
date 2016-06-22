var knexConnection = require('./knexConnection');
var UserRepo = require('./repo/userRepo.js');
var userRepo = new UserRepo(knexConnection);
var KeyRepo = require('./repo/keyRepo.js');
var keyRepo = new KeyRepo(knexConnection);

var KeyGenerator = require('./keygen.js');
var express = require('express');
var bodyParser = require('body-parser');
var log = require('winston');
var app = express();

var jsonParser = bodyParser.json();

log.level = 'debug';

app.use(express.static("public"));
app.use(express.static("build"));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', jsonParser, (req, res)=>{
  userRepo.saveUser(req.body)
  .then((userId)=> {

    let key = KeyGenerator.generate();
    keyRepo.saveKey(key, userId)
    .then(()=> {
        return res.send(key);
    })
    .catch((error)=>{
      log.log('error', error);
    });

  });
});

app.post('/key/validate', jsonParser, (req, res)=>{
  let decodedApiCredentials = Buffer.from(req.body.apiKey, 'base64').toString('ascii');
  try{
      let credentials = JSON.parse(decodedApiCredentials);
      let generatedHmac = KeyGenerator.generateHmac(credentials.key);
      if(credentials.hmac === generatedHmac){
          res.send('key is valid');
          return;
      }
      res.status(404).send('Invalid');
      return;
  }
  catch(error){
    if( typeof e === SyntaxError){
        res.status(404).send('Invalid');
    }
    log.log('error', 'error during key validation', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(8080, ()=>{
  log.log('info', 'Server started...');
});
