var express = require("@runkit/runkit/express-endpoint/1.0.0");
var bodyParser = require("body-parser");
var randomWords = require("random-words")
var uuid = require("uuid/v4");
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

function randomDonor(){
    return new Donor (uuid(), randomWords(3), randomWords(50));
}

function randomCharity(){
    return new Chairty (uuid(), randomWords(3), randomWords(50));
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

class ProfileRepository = Base => class extends Base {
    getProfile(profile_id) { }
    createOrUpdateProfile(profile) { }
}

class TransactionRepository = Base => class extends Base {
    getTransaction(transaction_id) { }
    createOrUpdateTransaction(transaction) { }
}

class ProfileSearcher = Base => class extends Base {
    findProfile(query){ }
}

class TransactionSearcher = Base => class extends Base {
    findTransaction(query) { }
}


class DummyRepository extends ProfileSearcher(ProfileRepository(TransactionRepository(Object))) {
    getProfile(profile_id) { 
        
    }
    createOrUpdateProfile(profile) { }
    getTransaction(profile_id) { }
    createOrUpdateTransaction(profile) { }
    findProfile(query){ }
}

var repo = new DummyRepository();

//enable CORS

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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

app.get("/profile/:id?", getProfile)
app.get("/transaction/:id?", getTransaction)

app.post("/profile", createOrUpdateProfile);
app.post("/transaction", createOrUpdateTransaction);

function getProfile(req, res){
    res.send(repo.getProfile(req.params.id));
}

function createOrUpdateProfile(req, res){
    repo.createOrUpdateProfile(req.body);
    res.status(200).end();
}

function searchProfiles(req, res){
    res.send(repo.findProfile(res.params.q));
}

function getTransaction(req, res){
    res.send(repo.getTransaction(req.params.id));
}

function createOrUpdateTransaction(req, res){
    repo.createOrUpdateTransaction(req.body);
    res.status(200).end();
}
