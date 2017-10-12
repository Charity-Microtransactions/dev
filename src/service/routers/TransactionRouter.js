
const express = require("express")
exports.create = repo =>{
  router = express.Router();
  router.get(":id?", getTransaction)
  router.post(":id?", createOrUpdateTransaction);

  function getTransaction(req, res){
      res.send(repo.getTransaction(req.params.id));
  }

  function createOrUpdateTransaction(req, res){
      repo.createOrUpdateTransaction(req.body);
      res.status(200).end();
  }
  return router;
}
