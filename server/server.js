var UserRepo = require('./repo/userRepo.js');
var KeyRepo = require('./repo/keyRepo.js');
var KeyGenerator = require('./keygen.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var staticFolder = "./static/";

var jsonParser = bodyParser.json();

app.use(express.static("public"));
app.use(express.static("build"));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/register', jsonParser, (req, res)=>{
  let key = KeyGenerator.generate();

  UserRepo.saveUser(req.body)
  .then((ownerId)=>{
    console.log("key: "+key);
    KeyRepo.saveKey(key, ownerId)
    .then(()=>{
        res.send(key);
    })
    .catch((error)=>{
      console.log(error)
    })
  });
})

app.post('/login', (req, res) => {
  res.send("ok")
})

app.post('/isvalidkey', jsonParser, (req, res)=>{
  let key = req.body.key;
  let hmac = req.body.hmac;

  let generatedHmac = KeyGenerator.generateHmac(key);

  if(hmac == generatedHmac){
      res.send('ok');
      return;
  }
  res.status(404).send('Invalid');

})

app.listen(8080, ()=>{
  console.log("listening...");
})
