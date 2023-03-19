const serviceAbs = require('./serviceAbs');

/* GET home page. */
class donationTransService extends serviceAbs {
    #_csvField;
    constructor() {
        super();
        this.#_csvField = [
            { label: "商品訂單編號", value: 'id' },
            { label: "委託金額", value: 'amount' },
            { label: "週期", value: 'cycle' },
            { label: "週期授權期間", value: 'cyclePeriod' },
            { label: "授權期數", value: 'authPeriod' },
            { label: "信用卡卡號", value: 'creditNumber' },
            { label: "信用卡到期日", value: 'creditMaturity' },
            { label: "商品名稱", value: 'productName' },
            { label: "付款人姓名", value: 'consumerName' },
            { label: "付款人電話", value: 'consumerTel' },
            { label: "付款人地址", value: 'consumerAddr' },
            { label: "付款人 Email", value: 'consumerEmail' },
            { label: "付款人發票抬頭", value: 'consumerInvoiceTitle' },
            { label: "付款人發票統編", value: 'consumerInvoiceNumber' },
            { label: "收件人姓名", value: 'recipientName' },
            { label: "收件人電話", value: 'recipientTel' },
            { label: "收件人地址", value: 'recipientAddr' },
            { label: "收件人 Email", value: 'recipientEmail' },
            { label: "Notify URL", value: 'notifyUrl' },
        ]
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
                const data = await this.DB.donationTrans.getRangeData({
                    where: req.query
                })
                return this.downloadResource(res, this.#_csvField, data)
            } catch(e) {
                console.log(e)
                res.statusCode = 400
                return res.json({
                    message: this.statusText.dwnloadFail,
                });
            }
        }
    }
}

module.exports = donationTransService;
