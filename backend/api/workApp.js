const axios = require('axios');

class workApp {
    config;
    url;
    constructor() {
        this.url =  process.env['REQUEST_SERVER_URL'];
        this.route = {
            login: "entry/login",
        }
    }

    async login(body) {
        console.log(body)
        const res = await axios.post(this.url + this.route.login, body)
        return res
    }
}

module.exports = new workApp();