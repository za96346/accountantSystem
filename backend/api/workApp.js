

class workApp {
    config;
    constructor() {
        this.config = {
            uri: 'https://workapp.tw/workApp',
            body: JSON.stringify(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.route = {
            login: "/entry/login",
        }
    }

    post () {

    }

    login(body, callback) {
        request(clientServerOptions, (error, response) => {
            const data = JSON.parse(response.body)
            console.log(data.data);
            const a = jwt.verify(data.data, process.env["TOKEN_PASSWORD"])
            console.log(a)
        });
    }
}