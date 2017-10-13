const Profile = require("./Profile");
module.exports = class Charity extends Profile {
    get type() { return CHARITY_TYPE; }
}
