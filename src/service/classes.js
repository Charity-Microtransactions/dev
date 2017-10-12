const DONOR_TYPE = "DONOR";
const CHARITY_TYPE = "CHARITY";

class Profile {
    constructor (id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
    }
    get type(){
        return this.type;
    }
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

class Account {
  constructor(userName = "", signedIn = false, currentTokens = 0){
    [this.userName, this.signedIn, this.currentTokens] = [userName, signedIn, currentTokens];
  }
}

const AccountRepository = Base => class extends Base {
  attemptLogin(username, password) {}
  getCurrentAccount(sessionToken) {}
  logout() {}
}

const ProfileRepository = Base => class extends Base {
    getProfile(profile_id) { }
    createOrUpdateProfile(profile) { }
}

const TransactionRepository = Base => class extends Base {
    getTransaction(transaction_id) { }
    createOrUpdateTransaction(transaction) { }
}

const ProfileSearcher = Base => class extends Base {
    findProfile(query){ }
    browseProfiles(query) {}
}

const TransactionSearcher = Base => class extends Base {
    findTransaction(query) { }
    getTransactionsForProfile(id) { }
}


exports.Profile = Profile;
exports.Account = Account;
exports.Transaction = Transaction;
exports.Donor = Donor;
exports.Charity = Charity;
exports.ProfileRepository = ProfileRepository;
exports.TransactionRepository = TransactionRepository;
exports.ProfileSearcher = ProfileSearcher;
exports.TransactionSearcher = TransactionSearcher;
