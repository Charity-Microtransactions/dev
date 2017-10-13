const express = require("express");
exports.create = repo =>{
  var router = express.Router();
  router.get("/", getCurrentAccount)
  router.post("/login", login)
  function login(req, res){
    var sessionToken = repo.attemptLogin(req.body.userName, req.body.password);
    res.send({
      loginAttempt:{
        success:!!sessionToken,
        token:sessionToken,
        account:repo.getCurrentAccount()
      }
    });
  }
  function getCurrentAccount(req, res){
    res.send(repo.getCurrentAccount())
  }
  return router;
}
