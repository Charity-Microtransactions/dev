var express = require("@runkit/runkit/express-endpoint/1.0.0");
var _ = require("underscore");
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
    return new Charity (uuid(), randomWords(3), randomWords(50));
}

function randomTransaction(from_id, to_id){
    return new Transaction(uuid, from_id, to_id, _.random(1,1000), new Date());
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

var ProfileRepository = Base => class extends Base {
    getProfile(profile_id) { }
    createOrUpdateProfile(profile) { }
}

var TransactionRepository = Base => class extends Base {
    getTransaction(transaction_id) { }
    createOrUpdateTransaction(transaction) { }
}

var ProfileSearcher = Base => class extends Base {
    findProfile(query){ }
}

var TransactionSearcher = Base => class extends Base {
    findTransaction(query) { }
    getTransactionsForProfile(id) { }
}


class DummyRepository extends ProfileSearcher(ProfileRepository(TransactionRepository(Object))) {
    constructor(){
        [this.profiles, this.transactions] = [[], []];
    }
    getProfile(profile_id) { 
        return _.find(this.profiles, p => p.id === profile_id);
    }
    getTransactionsForProfile(id) { 
        return _.filter(this.transactions, t => t.from_id === id || t.to_id === id);
    }
    createOrUpdateProfile(profile) { 
        var existingProf = getProfile(profile.id);
        if(existingProf)
        {
            var idx = _.indexOf(this.profiles, existingProf);
            this.profiles[idx] = profile;
        }
        else
        {
            this.profiles.push(profile);
        }
    }
    getTransaction(transaction_id) {
        return _.find(this.transactions, t => t.id === transaction_id);
    }
    createOrUpdateTransaction(profile) { 
    
    }
    findProfile(query) { 
        var searchTest = new RegExp(query, "ig");
    
        return _.filter(this.profiles, p=> 
            searchTest.test(p.id) 
            || searchTest.test(p.name) 
            || searchTest.test(p.description));
    }
}

var repo = new DummyRepository();

function populateDummyRepo(dummyRepo){  
    var donors = _.range(10).map(randomDonor);
    var charities = _.range(10).map(randomCharity);
    var transactions = _.zip(
        _.sample(donors, 50),
        _.sample(charities, 50),
        (d,c) => randomTransaction(d.id, c.id));
    dummyRepo.profiles = _.union(donors, charities);
    dummyRepo.transactions = transactions;
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.get("/profile/:id?", getProfile)
app.get("/profile/:id/transactions", getTransactionsByProfile);
app.get("/transaction/:id?", getTransaction)

app.post("/profile", createOrUpdateProfile);
app.post("/transaction", createOrUpdateTransaction);

function getProfile(req, res){
    res.send(repo.getProfile(req.params.id));
}

function getTransactionsByProfile(req, res){
    res.send(repo.getTransactionsForProfile(req.id));
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
