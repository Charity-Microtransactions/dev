const express = require("express");
exports.create = repo =>{
  var router = express.Router();
  router.get("/", getCurrentAccount)
  function getCurrentAccount(req, res){
    res.send(repo.getCurrentAccount())
  }
  return router;
}
