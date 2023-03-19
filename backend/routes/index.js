const donationTransRouter = require("./donationTrans");
const entryRouter = require("./entry");

class indexRouter {
    constructor(app) {
        new donationTransRouter(app)
        new entryRouter(app)
    }
}

module.exports = (app) => new indexRouter(app);
