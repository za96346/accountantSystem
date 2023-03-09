const database = require('../database/index');

/* GET home page. */
class serviceAbs {
    DB;
    constructor() {
        this.DB = database;
    }
}

module.exports = serviceAbs;
