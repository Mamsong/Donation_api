var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//loginページの追加
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var donationInputRouter = require('./routes/donationInput');
var nationsRouter = require('./routes/nations');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(session({
//   secret: "testing",
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/logout', logoutRouter);
app.use('/donation_input',donationInputRouter);
app.use('/nations',nationsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message)
  res.send({ message: err.message })
  // res.render('error');
});

module.exports = app;
