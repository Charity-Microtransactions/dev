var express = require("@runkit/runkit/express-endpoint/1.0.0");
var aws = require('aws-sdk')
var app = express(exports);
const DONOR_TYPE = "DONOR";
const CHARITY_TYPE = "CHARITY";

class Profile {
    constructor (id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = "";
    }
    get type(){
        return this.type;
    }
}

class Donor extends Profile {
    get type(){ return DONOR_TYPE; }
}

class Charity extends Profile {
    get type() { return CHARITY_TYPE; }
}

class Transaction {
    constructor (id, from_id, to_id, amount, date){
        this.id = id;
        this.from_id = from_id;
        this.to_id = to_id;
        this.amount = amount;
        this.date  = date;
    }
}

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
