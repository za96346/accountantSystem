const serviceAbs = require('./serviceAbs');
const workAppAPi = require('../api/workApp');

/* GET home page. */
class entryService extends serviceAbs {
    constructor() {
        super();
    }

    login() {
        return async (req, res, next) => {
            try {
                const data = await workAppAPi.login(req.body)
                return res.status(200).json({
                    message: this.statusText.fetchSuccess,
                    data,
                });
            } catch(e) {
                // console.log(e)
                return res.status(400).json({
                    message: this.statusText.fetchFail,
                    data: e
                });
            }
        }
    }
}

module.exports = entryService;
