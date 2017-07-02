const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    director: String,
    rating: Number,
    createdon: {
        type: Date, default: Date.now
    },
    time: {
        type: Schema.Types.ObjectId,
        ref: 'showtime'
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;