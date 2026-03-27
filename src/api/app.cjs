var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

console.log('--- TESTE DE AMBIENTE ---');
console.log('TOKEN:', process.env.GITHUB_TOKEN ? 'OK' : 'VAZIO');
console.log('USER:', process.env.GITHUB_USERNAME ? 'OK' : 'VAZIO');
console.log('Test:', process.env.ASAFE_ASA ? 'OK' : 'VAZIO');

var indexRouter = require('./routes/index.cjs');
var collaboratorRouter = require('./routes/collaborator.cjs');
var projectRouter = require('./routes/projects.cjs');
var languageRouter = require('./routes/language.cjs');
var githubConnectionRouter = require('./routes/githubConnection.cjs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const isLocalhost =
      origin.startsWith('http://localhost:517') ||
      origin.startsWith('http://127.0.0.1:517');

    if (isLocalhost) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/collaborators', collaboratorRouter);
app.use('/projects', projectRouter);
app.use('/language', languageRouter);
app.use('/githubConnection', githubConnectionRouter);

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
});


module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor ON na porta ${PORT}`);
});