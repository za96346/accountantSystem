const serviceAbs = require('./serviceAbs');

/* GET home page. */
class donationTransService extends serviceAbs {
    constructor() {
        super();
    }

    getDonationTrans() {
        return (req, res, next) => {
            this.DB.donationTrans.getRangeData()
            return res.send({
                status: 200,
                message: "登入成功!",
                data: [{ name: 'hi', key: '0' }],
                token: 'efefef'
            });
        }
    }
}

module.exports = donationTransService;
