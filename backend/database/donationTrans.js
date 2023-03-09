const databaseAbs = require('./databaseAbs');


// orderSid varchar(20) unique not null
// amount int(6) default 0 not null
// cycle varchar(1) not null

// cyclePeriod varchar(4) not null
// authPeriod varchar(2) not null
// creditNumber varchar(16) not null
// creditMaturity varchar(5) not null
// productName varchar(100) not null
// consumerName varchar(30)
// consumerTel varchar(20)
// consumerAddr varchar(200)
// consumerEmail varchar(100) not null
// consumerInvoiceTitle varchar(200)
// consumerInvoiceNumver int(8)
// recipientName varchar(200)
// recipientTel varchar(20)
// recipientAddr varchar(200)
// recipientEmail varchar(100)
// notifyUrl varchar(100)

class donationTrans extends databaseAbs {
    fullStruct;
    constructor() {
        super()
        this.table = 'donationTransaction'
        // 定義一個叫做 User 的資料結構
        this.fullStruct = this.mysql.define(this.table, {
            // 定義 Model 屬性
            orderSid: {   // 欄位名稱
                type: this.sequelize.STRING,  //  資料型態
                allowNull: false // 能不能為空，預設是 true
            },
            amount: {
                type: this.sequelize.STRING,
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
            }
        }, {
            // Other model options go here
        });
    }

    getRangeData() {
        this.mysql.sync().then(() => {
            this.fullStruct.findAll().then((v) => {
                console.log('\n\n')
                console.log(JSON.stringify(v))
            })
        })
    }
}
module.exports = donationTrans;
