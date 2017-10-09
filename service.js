var express = require("express");
var bodyParser = require("body-parser");
var randomWords = require("random-words")
var uuid = require("uuid/v4");
var aws = require('aws-sdk')
var app = express();
const classes = require("./classes")
const Profile = classes.Profile;
const Account = classes.Account;

const randos = require("./randos");
const randomDonor = randos.randomDonor;
const randomCharity = randos.randomCharity;
const randomTransaction = randos.randomTransaction;

const DummyRepository = require("./dummyRepository");

const repo = new DummyRepository.DummyRepository();
DummyRepository.populateDummyRepo(repo);


//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/scripts", express.static("site"));

app.get("/api/search", searchProfiles)
app.get("/api/account", getCurrentAccount)
app.get("/api/profile/:id?", getProfile)
app.post("/api/profile/:id?", createOrUpdateProfile);

app.get("/api/profile/:id/transactions", getTransactionsByProfile);

app.get("/api/transaction/:id?", getTransaction)
app.post("/api/transaction/:id?", createOrUpdateTransaction);

function getCurrentAccount(req, res){
  res.send(repo.getCurrentAccount())
}

function getProfile(req, res){
    res.send(repo.getProfile(req.params.id));
}

function getTransactionsByProfile(req, res){

}

function createOrUpdateProfile(req, res){
    repo.createOrUpdateProfile(req.body);
    res.status(200).end();
}

function searchProfiles(req, res){
    res.send(repo.findProfile(req.query.q));
}

function getTransaction(req, res){
    res.send(repo.getTransaction(req.params.id));
}

function createOrUpdateTransaction(req, res){
    repo.createOrUpdateTransaction(req.body);
    res.status(200).end();
}

//enable SPA
app.use((req, res) =>{
  res.sendFile(__dirname + "/site/index.html");
})

app.listen(3000, () => console.log("listening on port 3000"))
