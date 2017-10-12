const classes = require("./classes");
const uuid = require("uuid/v4");
const randomWords = require("random-words");

exports.randomDonor = ()=> new classes.Donor (uuid(), randomWords(3).join(' '), randomWords(50).join(' '));
exports.randomCharity = ()=> new classes.Charity (uuid(), randomWords(3).join(' '), randomWords(50).join(' '));
exports.randomTransaction = (from_id, to_id)=>
     new classes.Transaction(uuid, from_id, to_id, _.random(1,1000), new Date());
