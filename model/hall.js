const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const hallSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    places: {
        type: Number,
        required: true,
        min: [1, 'Count of places must be non zero']
    },
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