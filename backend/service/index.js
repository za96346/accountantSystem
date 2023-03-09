const donationTransService = require("./donationTrans");

class indexService {
    donationTrans;
    constructor() {
        this.donationTrans = new donationTransService()
    }
}

module.exports = new indexService()
