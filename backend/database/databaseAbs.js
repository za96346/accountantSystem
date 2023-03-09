// 引入 sequelize 套件
const { Sequelize } = require('sequelize');

class databaseAbs {
    mysql;
    table = '';
    sequelize;
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
    }
}

module.exports = databaseAbs;
