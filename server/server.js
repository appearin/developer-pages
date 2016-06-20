var UserRepo = require('./repo/userRepo.js');
var KeyRepo = require('./repo/keyRepo.js');
var KeyGenerator = require('./keygen.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var staticFolder = "./static/";

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({extended: true});

app.use(express.static("public"));
app.use(express.static("build"));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/isvalidkey', jsonParser, (req, res)=>{
  let body = Buffer.from(req.body.key, 'base64').toString('ascii');
  try{
      let data = JSON.parse(body)
      let generatedHmac = KeyGenerator.generateHmac(data.key);
      if(data.hmac == generatedHmac){
          res.send('ok');
          return;
      }
      res.status(404).send('Invalid');
      return
  }
  catch(e){
    if( typeof e == SyntaxError){
        res.status(404).send('Invalid');
    }
    console.log(e)
    res.status(500).send('Internal server error');
  }




})

app.listen(8080, ()=>{
  console.log("listening...");
})
