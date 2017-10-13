const Profile = require("./Profile");

module.exports = class Donor extends Profile {
    get type(){ return DONOR_TYPE; }
}
