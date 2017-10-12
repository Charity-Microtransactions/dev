const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

app.use("/scripts", express.static(__dirname + "/site"));

const SearchRouter = require("./routers/SearchRouter");
app.use("/api/search", SearchRouter.create(repo))

const AccountRouter = require("./routers/AccountRouter");
app.use("/api/account", AccountRouter.create(repo))

const ProfileRouter = require("./routers/ProfileRouter");
app.use("/api/profile", ProfileRouter.create(repo));

const TransactionRouter = require("./routers/TransactionRouter")
app.use("/api/transaction", TransactionRouter.create(repo));

//enable SPA
app.use((req, res) => res.sendFile(__dirname + "/site/index.html"))

app.listen(3000, () => console.log("listening on port 3000"))
