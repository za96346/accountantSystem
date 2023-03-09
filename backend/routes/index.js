const donationTransRouter = require("./donationTrans");

class indexRouter {
    constructor(app) {
        new donationTransRouter(app)
    }
}

module.exports = (app) => new indexRouter(app);
