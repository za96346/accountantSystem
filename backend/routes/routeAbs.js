const indexService = require("../service/index");


class routeAbs {
    service;
    app;
    groupRoute;
    constructor({
        app,
        service
    }) {
        this.app = app;
        if (process.env['NODE_ENV'] === 'production') {
            // app.set('base', '/accountantSystemApi')
            // console.log('base => ', '/accountantSystemApi')
            // this.app.use('/accountantSystemApi')
            this.groupRoute = `/accountantSystemApi/${service}`
        } else {
            this.groupRoute = `/${service}`
        }
        this.service = new indexService()[service]
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
