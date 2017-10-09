const express = require("express");
exports.create = repo => {
  const ProfileRouter = express.Router();

  ProfileRouter.get("/:id?", getProfile)
  ProfileRouter.post("/:id?", createOrUpdateProfile);
  ProfileRouter.get("/:id/transactions", getTransactionsByProfile);

  function getProfile(req, res){
      res.send(repo.getProfile(req.params.id));
  }

  function getTransactionsByProfile(req, res){

  }

  function createOrUpdateProfile(req, res){
      repo.createOrUpdateProfile(req.body);
      res.status(200).end();
  }
  return ProfileRouter;
}
