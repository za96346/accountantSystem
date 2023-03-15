
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
        route.post('/data', this.service.updateDonationTrans())
        route.put('/data', this.service.createDonationTrans())
        route.delete('/data', this.service.deleteDonationTrans())
        route.get('/csv', this.service.getDonationTransCSV())
    }
}

module.exports = donationTransRouter;
