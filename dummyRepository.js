const _ = require("underscore");
const classes = require("./classes");
const Profile = classes.Profile;
const Account = classes.Account;
const randomWords = require("random-words");
const randos = require("./randos");
const randomDonor = randos.randomDonor;
const randomCharity = randos.randomCharity;
const randomTransaction = randos.randomTransaction;

class DummyRepository extends classes.ProfileSearcher(classes.ProfileRepository(classes.TransactionRepository(Object)))
{
    constructor(){
      super();
        this.profiles = [];
        this.transactions = [];
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
        if(!query) return this.browseProfiles();
        var searchTest = new RegExp(query, "ig");

        return _.filter(this.profiles, p=>
            searchTest.test(p.id)
            || searchTest.test(p.name)
            || searchTest.test(p.description));
    }
    browseProfiles(query) {
      return this.profiles;
    }
    getCurrentAccount(){
      return this.currentAccount;;
    }
}
function populateDummyRepo(dummyRepo){
    var donors = _.range(10).map(randomDonor);
    var charities = _.range(10).map(randomCharity);
    var transactions = _.zip(
        _.sample(donors, 50),
        _.sample(charities, 50),
        (d,c) => randomTransaction(d.id, c.id));
    dummyRepo.profiles = _.union(donors, charities);
    dummyRepo.transactions = transactions;
    dummyRepo.currentAccount = new Account(randomWords(3).join(' '), true, _.random(1,1000));
}

var repo = new DummyRepository();
populateDummyRepo(repo);

exports.DummyRepository = DummyRepository;
exports.populateDummyRepo = populateDummyRepo;
