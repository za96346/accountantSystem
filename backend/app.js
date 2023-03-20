const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
var logger = require('express-logger');
const expressJWT = require('express-jwt');
require('express-group-routes');
require('csv-express')

// router
const indexRouter = require('./routes/index');
const workAppApi = require('./api/workApp');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middle ware
app.use(logger({ path: './logfile.txt' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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
		return !data?.status
	},
	onExpired: async (req, err) => {
		if (new Date() - err.inner.expiredAt < 5000) { return;}
		throw "登入憑證過期 請重新登入";
	},
}).unless({ path: ['/entry/login'] }));

app.use(function (err, req, res, next) {
	if (err.name === "登入憑證過期 請重新登入") {
	  	res.status(401).send({
			message: "invalid token..."
	  	});
	} else {
	  	next(err);
	}
});
// app.use(session({
// 	secret: process.env["TOKEN_PASSWORD"],
// 	resave: false, // 固定寫法
// 	saveUninitialized: true, // 固定寫法
// }));

indexRouter(app)
// catch 404 and forward to error handler
// app.use((req, res, next) => {
// 	next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



module.exports = app;
