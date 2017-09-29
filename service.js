var express = require("@runkit/runkit/express-endpoint/1.0.0"); 
var aws = require('aws-sdk')
var app = express(exports);

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test echo service
app.get("/:name?", (req, res) => {
    res.setHeader("Content-Type", "text/json");
    res.send(JSON.stringify({ 
        name:req.params.name 
    }))
})

app.get("/search", searchProfiles)

app.get("/profile/:name?", getProfile)
app.get("/transaction/:id?", getTransaction)

app.post("/profile", createOrUpdateProfile);
app.post("/transaction", createOrUpdateTransaction);

function getProfile(req, res){

}

function createOrUpdateProfile(req, res){

}

function searchProfiles(req, res){

}

function getTransaction(req, res){

}

function createOrUpdateTransaction(req, res){

}
