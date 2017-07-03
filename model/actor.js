const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    lastName: String,
    firstName: String,
    description: String,
    birthDay: {
        type: Date
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }]
});

const Actor = mongoose.model('actor', actorSchema);
module.exports = Actor;