var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: '1234', // Cambia 'secret-key' por una cadena aleatoria y segura
  resave: false,
  saveUninitialized: true,
  contact_id: 0,
  email: ''
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/checkLoginStatus', (req, res) => {
  const loggedIn = req.session.contact_id!=0; // Verifica si existe la propiedad userId en la sesión
  console.log("logueado:"+loggedIn);
  res.json({ loggedIn }); // Envia la respuesta al cliente como objeto JSON
});
app.use(express.static(path.join(__dirname, 'public')));

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
