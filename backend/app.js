const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const request = require('request');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middle ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressJWT.expressjwt({
//   secret: process.env["TOKEN_PASSWORD"],
//   algorithms: ['HS256']
// }).unless({ path: [/^\/login\//] }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(session({
	secret: {},
	resave: false, // 固定寫法
	saveUninitialized: true, // 固定寫法
}));

// 登入
app.post('/login', (req, res) => {
	const payload = {
	    username: req.body.username
	}
	const token = jwt.sign(payload, secretKey, { expiresIn: '60s' });
	res.send({
	    status: 200,
	    message: "登入成功!",
	    token
	});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

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
