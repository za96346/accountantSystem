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
}

module.exports = donationTransService;
