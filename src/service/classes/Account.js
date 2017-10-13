module.exports = class Account {
  constructor(userName = "", signedIn = false, currentTokens = 0){
    [this.userName, this.signedIn, this.currentTokens] = [userName, signedIn, currentTokens];
  }
}
