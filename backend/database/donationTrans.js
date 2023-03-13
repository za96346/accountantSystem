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

    // 獲取範圍資料
    async getRangeData({
        where = {}
    }) {
        const res = await this.fullStruct.findAll({
            where: this.filterEmpty(where),
        });
        return res;
    }

    // 更新資料
    async updateData({
        data = {},
    }) {
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
