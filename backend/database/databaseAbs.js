// 引入 sequelize 套件
const { Sequelize } = require('sequelize');

class databaseAbs {
    mysql;
    table = '';
    sequelize;
    #_notRequiredToQuery
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

        // 需要把它過濾的
        this.#_notRequiredToQuery = [
            'token'
        ]
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
}

module.exports = databaseAbs;
