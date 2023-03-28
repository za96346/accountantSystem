const axios = require('axios');

class workApp {
    config;
    url;
    constructor() {
        this.url =  process.env['REQUEST_SERVER_URL'];
        this.route = {
            login: "entry/login",
            selfInfo: "user/my",
            checkAccess: "entry/checkAccess",
        }
    }

    // 登入
    async login(body) {
        try {
            console.log(this.url + this.route.login)
            const res = await axios.post(this.url + this.route.login, {...body, IsAccountSystem: true})
            return {
                status: true,
                data: res?.data?.data
            }
        } catch {
            return {
                status: false
            }
        }
    }

    // 自己的資料
    async selfInfo(token) {
        try {
            const res = await axios.get(this.url + this.route.selfInfo, {
                params: {
                    token
                }
            })
            return {
                status: true,
                data: res?.data?.data[0]
            }
        } catch {
            return {
                status: false
            }
        }
    }

    // 驗證token
    async checkToken(token) {
        try {
            const res = await axios.get(this.url + this.route.checkAccess, {
                params: {
                    token
                }
            })
            return {
                status: true,
                data: res?.data || {}
            }
        } catch {
            return {
                status: false
            }
        }
    }
}

module.exports = new workApp();