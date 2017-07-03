const users = require('./users');
const movies = require('./movies');
const cinemas = require('./cinemas');
const halls = require('./halls');
const showTimes = require('./show_time');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/cinemas', cinemas);
    app.use('/halls', halls);
    app.use('/movies', movies);
    app.use('/showtime', showTimes);
};

