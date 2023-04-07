
const routeAbs = require("./routeAbs");


/* GET home page. */
class entryRouter extends routeAbs {
    constructor(app) {
        super({
            app,
            service: 'entry',
        })
    }
    _middleWare() {
        this.app.group(this.groupRoute, (route) => {
            this._routers(route);
        });
    }
    _routers(route) {
        route.post('/login', this.service.login)
    }
}

module.exports = entryRouter;
