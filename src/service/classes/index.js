const DONOR_TYPE = "DONOR";
const CHARITY_TYPE = "CHARITY";

module.exports = {
  Repositories:require("./repositories"),
  Searchers:require("./searchers"),

  Profile:require("./Profile"),
  Donor:require("./Donor"),
  Charity:require("./Charity"),
  Transaction:require("./Transaction"),
  Account: require("./Account"),
}
