const donationTrans = require('./donationTrans');

class indexDatabase {
    donationTrans;
    constructor() {
        this.donationTrans = new donationTrans();
    }
}
module.exports = new indexDatabase();
