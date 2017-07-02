const users = require('./users');
const movies = require('./movies');
const showTimes = require('./show_time');

module.exports = (app) => {
    app.use('/users', users);
    app.use('/movies', movies);
    app.use('/showtime', showTimes);
};

