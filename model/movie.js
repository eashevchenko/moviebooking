const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const defaultDuration = moment.duration(90, 'milliseconds');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    director: String,
    timeDuration: {
        type: Number,
        default: defaultDuration
    },
    showTimes: [{
        type: Schema.Types.ObjectId,
        ref: 'showtime'
    }],
    actors: [{
       firstName: String,
       lastName: String
    }],
    halls: [{
       type: Schema.Types.ObjectId,
        ref: 'hall'
    }],
});

movieSchema.virtual('end', function () {

});

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;