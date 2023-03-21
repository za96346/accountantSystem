const database = require('../database/index');
const Parser  = require('json2csv');
const fs = require('fs');
const { v4 } = require('uuid');
const crypto = require('crypto');

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

        fs.writeFile(`./public/csv/${fileName}`, csv, () => {
            res.download(`./public/csv/${fileName}`);
            res.send({
                data: process.env['DOWNLOAD_URL'] + 'csv/' + fileName,
                message: this.statusText.dwnloadSuccess,
            })
        })
    }
 
    /**
     * 加密方法
     * @param key 加密key
     * @param iv       向量
     * @param data     需要加密的数据
     * @returns string
     */
    encrypt  (key, iv, data) {
        var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        var crypted = cipher.update(data, 'utf8', 'binary');
        crypted += cipher.final('binary');
        crypted = new Buffer(crypted, 'binary').toString('base64');
        return crypted;
    };
 
    /**
     * 解密方法
     * @param key      解密的key
     * @param iv       向量
     * @param crypted  密文
     * @returns string
     */
    decrypt (key, iv, crypted) {
        crypted = new Buffer(crypted, 'base64').toString('binary');
        var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        var decoded = decipher.update(crypted, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    };
}

module.exports = serviceAbs;
