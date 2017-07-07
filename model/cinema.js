const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment = require('moment');

const cinemaSchema = new Schema({
    title: String,
    address: String,
    halls: [{
        type: Schema.Types.ObjectId,
        ref: 'hall'
    }]
});

cinemaSchema.statics.findMoviesByDate = function (cinemaId, from) {
    const startDate = from.slice(0, 10);
    const endDate = moment(startDate, "YYYY-MM-DD").add(1, 'days');

    const options = {
        path: 'halls',
        model: 'hall',
        select: {'showTimes': 1},
        match: {showTimes: {$exists: true, $ne: []}},
        populate: {
            path: 'showTimes',
            model: 'showtime',
            select: {'start': 1, 'movie': 1},
            match: {start: {"$gte": startDate, "$lte": endDate}},
            populate: {
                path: 'movie',
                model: 'movie',
                select: {'title': 1, 'timeDuration': 1}
            }
        }
    };

    return this.findById(cinemaId).populate(options);
};

const Cinema = mongoose.model('cinema', cinemaSchema);
module.exports = Cinema;