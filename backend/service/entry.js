const serviceAbs = require('./serviceAbs');
const workAppAPi = require('../api/workApp');
const jwt = require('jsonwebtoken');

/* GET home page. */
class entryService extends serviceAbs {
    constructor() {
        super();
    }

    login() {
        return async (req, res, next) => {
            try {
                const token = await workAppAPi.login(req.body) // 拿取 token
                const selfInfo = await workAppAPi.selfInfo(token) // 拿取 自己的資料

                return res.status(200).json({
                    token: jwt.sign({
                            user: selfInfo,
                            workAppToken: token,
                            exp: Math.floor(Date.now() / 1000) + (60 * 15)
                        },
                        process.env['TOKEN_PASSWORD']
                    ),
                    selfInfo,
                });
            } catch(e) {
                return res.status(400).json(e);
            }
        }
    }
}

module.exports = entryService;
