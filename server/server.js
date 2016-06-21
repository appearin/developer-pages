var UserRepo = require('./repo/userRepo.js');
var KeyRepo = require('./repo/keyRepo.js');
var KeyGenerator = require('./keygen.js');
var express = require('express');
var bodyParser = require('body-parser');
var log = require('winston');
var app = express();


var jsonParser = bodyParser.json();

app.use(express.static("public"));
app.use(express.static("build"));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', jsonParser, (req, res)=>{
  let key = KeyGenerator.generate();

  UserRepo.saveUser(req.body)
  .then((ownerId)=>{
    KeyRepo.saveKey(key, ownerId)
    .then(()=>{
        res.send(key);
    })
    .catch((error)=>{
      log.log('error', error);
    });
  });
});

app.post('/isvalidkey', jsonParser, (req, res)=>{
  let body = Buffer.from(req.body.key, 'base64').toString('ascii');
  try{
      let data = JSON.parse(body);
      let generatedHmac = KeyGenerator.generateHmac(data.key);
      if(data.hmac === generatedHmac){
          res.send('ok');
          return;
      }
      res.status(404).send('Invalid');
      return;
  }
  catch(error){
    if( typeof e === SyntaxError){
        res.status(404).send('Invalid');
    }
    log.log('error', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(8080, ()=>{
  log.log('info', 'Server started...');
});
