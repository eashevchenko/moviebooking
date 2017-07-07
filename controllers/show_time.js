const ShowTime = require('../model/showtime');
const Movie = require('../model/movie');
const Hall = require('../model/hall');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {getDefaultValues} = require('../helpers/appHelper');

module.exports = {

    getShowTimes: async (req, res, next) => {
        try {
            const showTimes = await ShowTime
                .find({});

            res.status(200).json(showTimes);
        } catch (err) {
            next(err);
        }
    },

    getShowTimesByPagination: async (req, res, next) => {
        try {

            const {page, limit, sort} = req.query;

            const pageRes = parseInt(page) ||  getDefaultValues.defaultPage;
            const limitRes = parseInt(limit) || getDefaultValues.defaultLimit;
            const sortRes = sort || getDefaultValues.defaultSort;

            const paginatedCinemas = await ShowTime
                .find({})
                .paginate(pageRes, limitRes)
                .sort({ title: sortRes });

            res.status(200).json(paginatedCinemas);
        } catch (err) {
            next(err);
        }
    },

    getShowTime: async (req, res, next) => {
        try {
            const {id} = req.params;
            const showTime = await ShowTime
                .findById(id);

            if(!showTime) {
                return res.status(404).json(initMessageObj(messages.notFoundShowTime));
            }

            res.status(200).json(showTime);
        } catch (err) {
            next(err);
        }
    },


    //TODO show time must be created if movie time (which translated) not across with show time
    createShowTime: async (req, res, next) => {
        try {
            const {id} = req.params;
            const showTime = new ShowTime(req.body);

            const hall = await Hall.findById(id);

            // send id of movie
            const movieId = req.body.movieId;

            const movie = await Movie.findById(movieId);

            showTime.end = movie.timeDuration;
            if(!movie) {
                return res.status(404).json(initMessageObj(messages.movieNotFoundMessage));
            }

            showTime.hall = hall;
            showTime.movie = movie;

            movie.showTimes.push(showTime);
            hall.showTimes.push(showTime);

            await showTime.save();
            await movie.save();
            await hall.save();
            res.status(201).json(showTime);
        } catch (err) {
            next(err);
        }
    }
};