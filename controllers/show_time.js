const ShowTime = require('../model/showtime');
const Movie = require('../model/movie');

module.exports = {

    getShowTimes: async (req, res, next) => {
        try {
            const showTimes = await ShowTime.find({});
            res.status(200).json(showTimes);
        } catch (err) {
            next(err);
        }
    },

    getShowTime: async (req, res, next) => {
        try {
            const {id} = req.params;
            const showTime = await ShowTime.findById(id);
            res.status(200).json(showTime);
        } catch (err) {
            next(err);
        }
    },

    createShowTime: async (req, res, next) => {
        try {
            const {id} = req.params;
            const showTime = new ShowTime(req.body);
            const movie = await Movie.findById(id);

            showTime.movie = movie;

            await showTime.save();

            movie.showTimes.push(showTime);

            await movie.save();

            res.status(201).json(showTime);
        } catch (err) {
            next(err);
        }
    }
};