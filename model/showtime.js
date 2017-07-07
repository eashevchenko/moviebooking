const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
    start: {
        type: Date,
        default: moment().utc().valueOf()
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'hall'
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }
});


showTimeSchema.virtual('end')
    .set(function (timeDuration) {
         return moment(this.start).add(timeDuration, 'minutes').utc();
    });

showTimeSchema.set('toJSON', { virtuals: true });
showTimeSchema.set('toObject', { virtuals: true });


showTimeSchema.methods.isTimeCollided = function () {

};

const ShowTime = mongoose.model('showtime', showTimeSchema);
module.exports = ShowTime;
