const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hallSchema = new Schema({
    title: String,
    places: Number,
    cinema: {
        type: Schema.Types.ObjectId,
        ref: 'cinema'
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'ticket'
    }]
});

const Hall = mongoose.model('hall', hallSchema);
module.exports = Hall;