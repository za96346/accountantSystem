const serviceAbs = require('./serviceAbs');

/* GET home page. */
class donationTransService extends serviceAbs {
    constructor() {
        super();
    }

    getDonationTrans() {
        return async (req, res, next) => {
            try {
                console.log(req.query)
                const data = await this.DB.donationTrans.getRangeData({
                    where: req.query
                })
                return res.json({
                    message: this.statusText.fetchSuccess,
                    data,
                });
            } catch {
                res.statusCode = 400
                return res.json({
                    message: this.statusText.fetchFail,
                });
            }
        }
    }
    updateDonationTrans() {
        return async (req, res, next) => {
            try {
                await this.DB.donationTrans.updateData({
                    data: req.body,
                })
                return res.json({
                    message: this.statusText.updateSuccess,
                });
            } catch {
                res.statusCode = 400
                return res.json({
                    message: this.statusText.updateFail,
                });
            }
        }
    }
    createDonationTrans() {
        return async (req, res, next) => {
            try {
                await this.DB.donationTrans.createData({
                    data: req.body,
                })
                return res.json({
                    message: this.statusText.createSuccess,
                });
            } catch {
                res.statusCode = 400
                return res.json({
                    message: this.statusText.createFail,
                });
            }
        }
    }
    deleteDonationTrans() {
        return async (req, res, next) => {
            try {
                const data = await this.DB.donationTrans.deleteData({
                    data: req.query
                })
                return res.json({
                    message: this.statusText.deleteSuccess
                });
            } catch {
                res.statusCode = 400
                return res.json({
                    message: this.statusText.deleteFail,
                });
            }
        }
    }
    getDonationTransCSV() {
        return async (req, res, next) => {
            try {
                return res.csv([
                    {"a": 1, "b": 2, "c": 3},
                    {"a": 4, "b": 5, "c": 6}
                  ], true, {
                    "Access-Control-Allow-Origin": "*"
                  }, 500)
            } catch {
                res.statusCode = 400
                return res.json({
                    message: this.statusText.deleteFail,
                });
            }
        }
    }
}

module.exports = donationTransService;
