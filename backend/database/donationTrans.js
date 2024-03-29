const databaseAbs = require('./databaseAbs');

class donationTrans extends databaseAbs {
    fullStruct;
    constructor() {
        super()
        this.table = 'donationTransaction'
        // 定義一個叫做 User 的資料結構
        this.fullStruct = this.mysql.define(this.table, {
            // 定義 Model 屬性
            id: {   // 欄位名稱
                type: this.sequelize.STRING,  //  資料型態
                allowNull: false, // 能不能為空，預設是 true
                primaryKey: true,
            },
            amount: {
                type: this.sequelize.INTEGER,
                allowNull: false,
            },
            cycle: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            cyclePeriod: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            authPeriod: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            creditNumber: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            creditMaturity: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            productName: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            consumerName: {
                type: this.sequelize.STRING,
            },
            consumerTel: {
                type: this.sequelize.STRING,
            },
            consumerAddr: {
                type: this.sequelize.STRING,
            },
            consumerEmail: {
                type: this.sequelize.STRING,
                allowNull: false,
            },
            consumerInvoiceTitle: {
                type: this.sequelize.STRING,
            },
            consumerInvoiceNumber: {
                type: this.sequelize.INTEGER,
            },
            recipientName: {
                type: this.sequelize.STRING,
            },
            recipientTel: {
                type: this.sequelize.STRING,
            },
            recipientAddr: {
                type: this.sequelize.STRING,
            },
            recipientEmail: {
                type: this.sequelize.STRING,
            },
            notifyUrl: {
                type: this.sequelize.STRING,
            },
            lastUserEdit: {
                type: this.sequelize.STRING,
            }
        }, {
            tableName: this.table,
            // Other model options go here
        });
    }

    // 資料驗證
    validData(data) {
        let errorText = ''
        // console.log(data, !data?.cyclePeriod)
        if (!data?.amount) errorText = ', 金額 驗證失敗'
        if (!data?.cycle) errorText = ', 週期 驗證失敗'
        if (!data?.cyclePeriod) errorText = ', 週期授權期間 驗證失敗'
        if (data?.authPeriod === null) errorText = ', 授權期數 驗證失敗'

        // 信用卡驗證
        if (!data?.creditNumber) errorText = ', 信用卡卡號 驗證失敗'
        // console.log(data?.creditNumber)
        if (data?.creditNumber?.length !== 16) errorText = ', 信用卡卡號 格式錯誤'
        if (isNaN(data?.creditNumber)) errorText = ', 信用卡卡號 請填入數字'

        // 信用卡 到期日 驗證
        if (!data?.creditMaturity) errorText = ', 信用卡到期日 驗證失敗'
        if (data?.creditMaturity?.length !== 5) errorText = ', 信用卡到期日 格式錯誤'

        // 商品名稱 驗證
        if (!data?.productName) errorText = ', 商品名稱 驗證失敗'
        
        // 付款人 email 驗證
        if (!data?.consumerEmail) errorText = ', 付款人 email 驗證失敗'
        if (data?.consumerEmail?.indexOf('@') === -1) errorText = ', 付款人 email 格式錯誤'

        if (errorText?.length > 0) {
            this.throwError({
                msg: errorText,
                statusCode: 403
            })
        }

        // 加密卡號
        data.creditNumber = this.crypto.encrypt(this._cryptKey, this._cryptIV, data?.creditNumber)
    }

    // 獲取範圍資料
    async getRangeData({
        where = {}
    }) {
        const res = await this.fullStruct.findAll({
            where: this.whereLike(this.filterEmpty(where)),
        });
        return res;
    }

    // 更新資料
    async updateData({
        data = {},
    }) {
        this.validData(data)
        // console.log(data?.creditNumber)
        const res = await this.fullStruct.update(data, {
            where: {
                id: data?.id,
            },
            returning: true,
            plain: true
        })
        return res
    }

    // 新增資料
    async createData({
        data = {},
    }) {
        this.validData(data)
        // console.log(data?.creditNumber)
        const res = await this.fullStruct.create(data)
        return res
    }

    // 刪除 資料
    async deleteData({
        data = {},
    }) {
        const res = await this.fullStruct.destroy({
            where: {
                id: data?.id
            }
        })
        return res
    }
}
module.exports = donationTrans;
