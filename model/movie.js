const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    description: String,
    director: String,
    timeDuration: Number,
    showTimes: [{
        type: Schema.Types.ObjectId,
        ref: 'showtime'
    }],
    actors: [{
       type: Schema.Types.ObjectId,
        ref: 'actor'
    }],
    halls: [{
       type: Schema.Types.ObjectId,
        ref: 'hall'
    }],
});

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;