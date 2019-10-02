const express = require('express'); // Our express app
// const path = require('path');   // A built-in library for handling project path
const logger = require('morgan'); // For logging the requests output in console
const cookieParser = require('cookie-parser'); // For cookies
const createError = require('http-errors'); // For detailed error display in browser

// For CORS
const cors = require('cors');

// Configuration for PassportJS
const passport = require('./auth/config');

const mongoose = require('mongoose');

// Import routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Create instance of an app
const app = express();

// Setup template engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/nepcodex',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to NepcodeX database'))
    .catch((err) => console.log(err));

// Use it above the error handling middleware
app.use('/auth', authRouter);
app.use('/', passport.authenticate('jwt',
    {
        session: false,
        failureRedirect: '/auth/signup'
    }), indexRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err; // In development only, comment this out in production

    // Uncomment the following in production
    // res.locals.error = {};


    // render the error page
    res.status(err.status || 500);
    res.send(res.locals);
});

app.listen(8000);

module.exports = app;

