const express = require("express");
exports.create = repo =>{
  var router = express.Router();
  router.get("/", searchProfiles);
  function searchProfiles(req, res){
      res.send(repo.findProfile(req.query.q));
  }
  return router;
}
