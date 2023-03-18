const database = require('../database/index');
const Parser  = require('json2csv');
const fs = require('fs');
const { v4 } = require('uuid');

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
            dwnloadSuccess: '下載成功',
            dwnloadFail: '下載失敗',
        }
    }

    downloadResource (res, fields, data) {
        const fileName= v4() + '.csv';
        const json2csv = new Parser.Parser({ fields });
        const csv = json2csv.parse(data);

        fs.writeFile(`./csv/${fileName}.csv`, csv, (err) => {
            console.log(err)
        })
        fs.close()
        setTimeout(() => {
            fs.rm(`../csv/${fileName}`)
        }, 3000)

        return res.download(`../csv/${fileName}`);

        // res.header('Content-Type', 'text/csv');
        // res.attachment(fileName);
        // return res.send({
        //     url: process.env["DOWNLOAD_URL"] + fileName 
        // });
    }
}

module.exports = serviceAbs;
