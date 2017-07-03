const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
    start: {
        type: Date,
        default: moment().valueOf()
    },
    end: {
        type: Date
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});

function scheduleMovie(start, duration) {
    if(start && duration) {
       return moment(start).add()
    }
}

const ShowTime = mongoose.model('showtime', showTimeSchema);
module.exports = ShowTime;
