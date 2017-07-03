const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});

const ShowTime = mongoose.model('showtime', showTimeSchema);
module.exports = ShowTime;
