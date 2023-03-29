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
                const data = await this.DB.donationTrans.getRangeData({
                    where: req.query
                })
                return res.json({
                    message: this.statusText.fetchSuccess,
                    data,
                });
            } catch {
                res.statusCode = this.DB.donationTrans.statusCode
                return res.json({
                    message: this.statusText.fetchFail + this.DB.donationTrans.log,
                });
            }
        }
    }
    updateDonationTrans() {
        return async (req, res, next) => {
            try {
                await this.DB.donationTrans.updateData({
                    data: {
                        ...req.body,
                        lastUserEdit: req.User?.UserName
                    },
                })
                return res.json({
                    message: this.statusText.updateSuccess,
                });
            } catch {
                res.statusCode = this.DB.donationTrans.statusCode
                return res.json({
                    message: this.statusText.updateFail + this.DB.donationTrans.log,
                });
            }
        }
    }
    createDonationTrans() {
        return async (req, res, next) => {
            try {
                await this.DB.donationTrans.createData({
                    data:  {
                        ...req.body,
                        lastUserEdit: req.User?.UserName
                    },
                })
                return res.json({
                    message: this.statusText.createSuccess,
                });
            } catch {
                res.statusCode = this.DB.donationTrans.statusCode
                return res.json({
                    message: this.statusText.createFail + this.DB.donationTrans.log
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
                res.statusCode = this.DB.donationTrans.statusCode
                return res.json({
                    message: this.statusText.deleteFail + this.DB.donationTrans.log,
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
                const decryptData = JSON.parse(JSON.stringify(data))?.map((item) => ({
                    ...item,
                    creditNumber: this.decrypt(req.query?.cryptKey, req.query?.cryptIV, item?.creditNumber)
                }))
                console.log(decryptData)
                return this.downloadResource(res, this.#_csvField, decryptData)
            } catch {
                res.statusCode = this.DB.donationTrans.statusCode
                return res.json({
                    message: this.statusText.dwnloadFail + '，請確認金鑰是否正確',
                });
            }
        }
    }
}

module.exports = donationTransService;
