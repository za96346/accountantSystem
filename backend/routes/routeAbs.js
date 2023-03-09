const indexService = require("../service/index");


class routeAbs {
    service;
    app;
    constructor({
        app,
        service
    }) {
        this.app = app;
        this.service = indexService[service]
        this._middleWare()
    }

    _middleWare() {
        console.log('you should set up the middleWare at the method _routers');
    }

    _routers() {
        console.log('you should set up the router at the method _routers');
    }
}
module.exports = routeAbs
