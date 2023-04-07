const serviceAbs = require('./serviceAbs');
const workAppAPi = require('../api/workApp');
const jwt = require('jsonwebtoken');

/* GET home page. */
class entryService extends serviceAbs {
    constructor() {
        super();
        this.login = this.login.bind(this)
    }

    async login(req, res, next) {
        try {
            const token = await workAppAPi.login(req.body) // 拿取 token
            const selfInfo = await workAppAPi.selfInfo(token?.data) // 拿取 自己的資料
            // 成功
            if (token.status && selfInfo.status) {
                return res.status(200).json({
                    token: jwt.sign({
                            user: selfInfo.data,
                            workAppToken: token.data,
                            exp: Math.floor(Date.now() / 1000) + 5
                        },
                        process.env['TOKEN_PASSWORD']
                    ),
                    selfInfo: selfInfo.data,
                    message: this.statusText.loginSuccess
                });
            } else {
                // console.log(token.status, selfInfo.status)
                throw new Error('')
            }
        } catch(e) {
            return res.status(404).json({
                message: this.statusText.loginFail
            });
        }
    }
}

module.exports = entryService;
