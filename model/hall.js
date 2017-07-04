const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hallSchema = new Schema({
    title: {
        type: String
    },
    places: {
        type: Number
    },
    cinema: {
        type: Schema.Types.ObjectId,
        ref: 'cinema'
    },
    showTimes: [{
        type: Schema.Types.ObjectId,
        ref: 'showtime'
    }],
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'ticket'
    }]
});

const Hall = mongoose.model('hall', hallSchema);
module.exports = Hall;