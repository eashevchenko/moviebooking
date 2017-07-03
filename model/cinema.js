const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    title: String,
    address: String,
    halls: [{
        type: Schema.Types.ObjectId,
        ref: 'hall'
    }]
});

const Cinema = mongoose.model('cinema', cinemaSchema);
module.exports = Cinema;