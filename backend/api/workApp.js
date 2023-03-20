const axios = require('axios');

class workApp {
    config;
    url;
    constructor() {
        this.url =  process.env['REQUEST_SERVER_URL'];
        this.route = {
            login: "entry/login",
            selfInfo: "user/my",
        }
    }

    async login(body) {
        const res = await axios.post(this.url + this.route.login, body)
        return res?.data?.data
    }

    async selfInfo(token) {
        const res = await axios.get(this.url + this.route.selfInfo, {
            params: {
                token
            }
        })
        return res?.data?.data[0] || {}
    }
}

module.exports = new workApp();