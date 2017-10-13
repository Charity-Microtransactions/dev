module.exports = class Account {
  constructor(userName = "Guest", signedIn = false, currentTokens = 0){
    [this.userName, this.signedIn, this.currentTokens] = [userName, signedIn, currentTokens];
  }
}
