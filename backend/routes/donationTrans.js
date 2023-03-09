
const routeAbs = require("./routeAbs");


/* GET home page. */
class donationTransRouter extends routeAbs {
    constructor(app) {
        super({
            app,
            service: 'donationTrans',
        })
    }
    _middleWare() {
        this.app.group('/donationTrans', (route) => {
            this._routers(route);
        });
    }
    _routers(route) {
        route.get('/data', this.service.getDonationTrans())
    }
}

module.exports = donationTransRouter;
