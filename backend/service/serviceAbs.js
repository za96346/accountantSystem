const database = require('../database/index');

/* GET home page. */
class serviceAbs {
    DB;
    statusText;
    constructor() {
        this.DB = database;
        this.statusText = {
            updateSuccess: "更新成功",
            updateFail: "更新失敗",
            fetchSuccess: "資料獲取成功",
            fetchFail: '資料獲取失敗',
            createSuccess: '新增成功',
            createFail: "新增失敗",
            deleteSuccess: '刪除成功',
            deleteFail: "刪除失敗",
        }
    }
}

module.exports = serviceAbs;
