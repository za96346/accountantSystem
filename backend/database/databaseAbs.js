// 引入 sequelize 套件
const { Sequelize } = require('sequelize');
const crypto = require('../method/crypto')

// 422 驗證資料失敗

class databaseAbs {
    mysql;
    table = ''; // table name
    sequelize; // 
    #_notRequiredToQuery // 把 不必要的 query request remove

    #_cryptKey;
    #_cryptIV;

    crypto; // 加密
    // log

    log; // log
    statusCode; // 404 or any
    constructor() {
        const database = process.env.DATA_BASE_NAME;
        const userName = process.env.DATA_BASE_USER;
        const password = process.env.DATA_BASE_PASSWORD;
        const host = process.env.DATA_BASE_IP;
        const port = process.env.DATA_BASE_PORT;
        // 透過 new 建立 Sequelize 這個 class，而 sequelize 就是物件 instance
        this.mysql = new Sequelize(database, userName, password, {
            host: host,
            dialect: 'mysql',
            port: port,
        });
        this.sequelize = Sequelize;
        this.crypto = crypto

        this.#_cryptKey =  process.env["CRYPT_SCRECT"];
        this.#_cryptIV =  process.env["CRYPT_IV"];

        // 需要把它過濾的
        this.#_notRequiredToQuery = [
            'token',
            'cryptIV',
            'cryptKey'
        ]

        this.statusCode = 400
    }

    // 過濾 空的
    filterEmpty(data = {}) {
        return Object.keys(data)
            .filter((key) =>
                data[key] !== null
                && data[key] !== ''
                && !this.#_notRequiredToQuery.includes(key) // 不在 需要過濾 key 裏面
            )
            .reduce((accr, key) => {
                accr[key] = data[key]
                return accr
            }, {})
    }

    // 加上like
    whereLike(data = {}) {
        return Object.keys(data)
            .reduce((accr, key) => {
                accr[key] = {
                    [this.sequelize.Op.like]: '%' + data[key] + '%'
                }
                return accr
            }, {}) 
    }

    get _cryptKey() {
        return this.#_cryptKey
    }
    
    get _cryptIV() {
        return this.#_cryptIV
    }
}

module.exports = databaseAbs;
