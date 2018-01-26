const users = require('./users');
const viewers = require('./viewers');
const movies = require('./movies');
const cinemas = require('./cinemas');
const halls = require('./halls');
const showTimes = require('./show_time');
const auth = require('./auth');

module.exports = (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/viewers', viewers);
    app.use('/cinemas', cinemas);
    app.use('/halls', halls);
    app.use('/movies', movies);
    app.use('/showtimes', showTimes);
};

