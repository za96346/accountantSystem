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
            loginSuccess: '登入成功',
            loginFail: '登入失敗，請確認 帳號密碼是否輸入正確'
        }
    }

    downloadResource (res, fields, data) {
        const fileName= v4() + '.csv';
        const json2csv = new Parser.Parser({ fields });
        const csv = json2csv.parse(data);

        fs.writeFile(`./public/csv/${fileName}`, '\ufeff' + csv, () => {
            res.download(`./public/csv/${fileName}`);
            res.send({
                data: process.env['DOWNLOAD_URL'] + 'csv/' + fileName,
                message: this.statusText.dwnloadSuccess,
            })
        })
    }
    
    // 處理錯誤
    handleError({
        res, error, prefixMsg
    }) {
        const errorObj = JSON.parse(error?.message || '{}');
        console.log('errorObj => ', errorObj)
        res.statusCode = errorObj?.statusCode || 403
        res.json({
            message: prefixMsg + ',' + (errorObj?.msg || ''),
        });
        return errorObj
    }
}

module.exports = serviceAbs;
