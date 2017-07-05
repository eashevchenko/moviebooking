const ShowTime = require('../model/showtime');
const Movie = require('../model/movie');
const Hall = require('../model/hall');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {getDefaultValues} = require('../helpers/appHelper');

module.exports = {

    getShowTimes: async (req, res, next) => {
        try {
            const showTimes = await ShowTime.find({});
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

            const skipRes = (pageRes * limitRes) - limitRes;
            const paginatedCinemas = await ShowTime.find({}).skip(skipRes).limit(limitRes).sort({ title: sortRes });
            res.status(200).json(paginatedCinemas);
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

            const hall = await Hall.findById(id);

            // send id of movie
            const movieId = req.body.movieId;

            if(!movieId) return res.status(404).json(initMessageObj(messages.movieNotFoundMessage));

            const movie = await Movie.findById(movieId);

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