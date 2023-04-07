const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url')


const session = require('express-session');
const cors = require('cors');
// var logger = require('express-logger');
const expressJWT = require('express-jwt');
require('express-group-routes');
require('csv-express')

// router
const indexRouter = require('./routes/index');
const workAppApi = require('./api/workApp');
const app = express();


// 依據還竟 仔入 env
if (process.env['NODE_ENV'] === "production") {
	require('dotenv').config({
		path: './.env.production.local'
	});
	console.log('production', process.env['REQUEST_SERVER_URL'])
	app.use('/accountantSystemApi', express.static(path.join(__dirname, 'public')));
} else {
	require('dotenv').config({
		path: './.env.development.local'
	});
	console.log('dev', process.env['REQUEST_SERVER_URL'])
	app.use(express.static(path.join(__dirname, 'public')));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// middle ware
// app.use(logger({ path: './logfile.txt' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 200
}));

// 此伺服器的token parser
app.use(expressJWT.expressjwt({
	secret: process.env['TOKEN_PASSWORD'],
	algorithms: ['HS256'],
	getToken: (req) => {
		if (req.method === 'GET') {
			return req.query?.token
		} else {
			return req.headers?.token
		}
	},
	isRevoked: async (req, token) => {
		// console.log('token => ', token.payload)
		req.User = {...token.payload}?.user || {}
		req.WorkAppToken = {...token.payload}?.workAppToken || ''
		// workapp token 驗證
		const data = await workAppApi.checkToken(req.WorkAppToken);
		// console.log("token workapp result => ", data);
		if (!data?.status) {
			throw new Error(JSON.stringify({
				msg: "登入憑證過期 請重新登入",
				statusCode: 401,
			}));
		}
		return !data?.status
	},
	onExpired: async (req, err) => {
		if (new Date() - err.inner.expiredAt < 5000) { return;}
	},
}).unless({ path: ['/entry/login', '/accountantSystemApi/entry/login'] }));

indexRouter(app)

// error handler
app.use((err, req, res, next) => {
	// console.log(err)
	const error = JSON.parse(err.message)
	res.status(error?.statusCode || 500);
	res.json({
		message: error.msg
	})
});

module.exports = app;
