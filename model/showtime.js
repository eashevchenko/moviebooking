const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
    start: {
        type: Date,
        default: moment().valueOf()
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'hall'
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});

const ShowTime = mongoose.model('showtime', showTimeSchema);
module.exports = ShowTime;
