var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require("mongoose");
var logger = require('morgan');
var methodOverwrite = require('method-override');
var cookieParser = require('cookie-parser');
var user = require('./models/user.js');
var passport =require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
mongoose.connect("mongodb://localhost/spectacle"); // this is our database

var seedDB = require("./seed");
seedDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var senerioRouter = require('./routes/senerio');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var logoutRouter = require('./routes/logout');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// passport configuration
app.use(require('express-session')({
  secret: "wins cutest dog",
  resave: false,
  savaUnintialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(methodOverwrite("_method"));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/senerio', senerioRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
