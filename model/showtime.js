const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
    date: new Date(),
    createdon: {
        type: Date, default: Date.now
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
});

const ShowTime = mongoose.model('Showtime', showTimeSchema);
module.exports = ShowTime;
