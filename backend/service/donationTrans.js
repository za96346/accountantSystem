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
        console.log('constructor')
        this.getDonationTrans = this.getDonationTrans.bind(this)
        this.createDonationTrans = this.createDonationTrans.bind(this)
        this.deleteDonationTrans = this.deleteDonationTrans.bind(this)
        this.updateDonationTrans = this.updateDonationTrans.bind(this)
        this.getDonationTransCSV = this.getDonationTransCSV.bind(this)
    }

    async getDonationTrans(req, res, next) {
        try {
            const data = await this.DB.donationTrans.getRangeData({
                where: req.query
            })
            return res.json({
                message: this.statusText.fetchSuccess,
                data,
            });
        } catch(error) {
            this.handleError({
                res,
                error,
                prefixMsg: this.statusText.fetchFail
            })
        }
    }
    async updateDonationTrans(req, res, next) {
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
        } catch(error) {
            this.handleError({
                res,
                error,
                prefixMsg: this.statusText.updateFail
            })
        }
    }
    async createDonationTrans(req, res, next) {
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
        } catch(error) {
            this.handleError({
                res,
                error,
                prefixMsg: this.statusText.createFail
            })
        }
    }
    async deleteDonationTrans(req, res, next) {
        try {
            const data = await this.DB.donationTrans.deleteData({
                data: req.query
            })
            return res.json({
                message: this.statusText.deleteSuccess
            });
        } catch(error) {
            this.handleError({
                res,
                error,
                prefixMsg: this.statusText.deleteFail
            })
        }
    }
    async getDonationTransCSV(req, res, next) {
        try {
            const data = await this.DB.donationTrans.getRangeData({
                where: req.query
            })
            const decryptData = JSON.parse(JSON.stringify(data))?.map((item) => ({
                ...item,
                creditNumber: this.DB.donationTrans.crypto.decrypt(req.query?.cryptKey, req.query?.cryptIV, item?.creditNumber)
            }))
            return this.downloadResource(res, this.#_csvField, decryptData)
        } catch {
            res.statusCode = 403
            return res.json({
                message: this.statusText.dwnloadFail + '，請確認金鑰是否正確',
            });
        }
    }
}

module.exports = donationTransService;
