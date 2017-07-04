const Cinema = require('../model/cinema');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {getDefaultValues} = require('../helpers/appHelper');
const moment  = require('moment');

module.exports = {

    getCinemas: async (req, res, next) => {
        try {
            const cinemas = await Cinema.find({});
            res.status(200).json(cinemas);
        } catch (err) {
            next(err);
        }
    },

    getCinemasByPagination: async (req, res, next) => {
      try {
          const {page, limit, sort} = req.query;

          const pageRes = parseInt(page) ||  getDefaultValues.defaultPage;
          const limitRes = parseInt(limit) || getDefaultValues.defaultLimit;
          const sortRes = sort || getDefaultValues.defaultSort;

          const skipRes = (pageRes * limitRes) - limitRes;
          const paginatedCinemas = await Cinema.find({}).skip(skipRes).limit(limitRes).sort({ title: sortRes });
          res.status(200).json(paginatedCinemas);
      } catch (err) {
          next(err);
      }
    },

    getCinemaById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const cinema = await Cinema.findById(id);

            cinema ? res.status(200).json(cinema)
                   : res.status(404).json(initMessageObj(messages.cinemaNotFoundMessage));
        } catch (err) {
            next(err);
        }
    },

    getCinemaHalls: async (req, res, next) => {
        try {
            const {id} = req.params;

            const options = {
                path: 'halls',
                select: {'title': 1, 'places': 1}
            };

            const cinemaHalls = await Cinema.findById(id).populate(options);

            if (!cinemaHalls) {
                return res.status(404).json(initMessageObj(messages.hallNotFoundMessage));
            }

            res.status(200).json(cinemaHalls.halls);

        } catch (err) {
            next(err);
        }
    },

    getCinemaMoviesByDate: async (req, res, next) => {
        try {
            const {id, from} = req.params;

            const queryDate = from.slice(0, 10);
            const endDate = moment(queryDate, "YYYY-MM-DD").add(1, 'days');

            const options = {
                path: 'halls',
                model: 'hall',
                select: {'showTimes': 1},
                match: {showTimes: {$exists: true, $ne: []}},
                populate: {
                    path: 'showTimes',
                    model: 'showtime',
                    select: {'start': 1, 'movie': 1},
                    match: {start: {"$gte": queryDate, "$lte": endDate}},
                    populate: {
                        path: 'movie',
                        model: 'movie',
                        select: {'title': 1, 'timeDuration': 1}
                    }
                }
            };

            const cinemaMovies = await Cinema.findById(id).populate(options);

            if(!cinemaMovies) {
                return res.status(404).json(initMessageObj(messages.moviesNotFoundMessage));
            }

            // TODO resolve empty array of showTimes
            // if showTimes result are empty - return not found message
            const cinemaObj = cinemaMovies.toObject();
            const showTimesArr = cinemaObj.halls[0].showTimes;

            if(showTimesArr && showTimesArr.length === 0) {
                return res.status(404).json(initMessageObj(messages.moviesNotFoundMessage));
            }

            res.status(200).json(cinemaMovies.halls);
        } catch (err) {
            next(err);
        }
    },

    createCinema: async (req, res, next) => {
        try {
            const cinema = new Cinema(req.body);
            const savedCinema = await cinema.save();
            res.status(201).json(savedCinema);
        } catch (err) {
            next(err);
        }
    },

    removeCinema: async (req, res, next) => {
        try {
            const {id} = req.params;
            await Cinema.findByIdAndRemove(id);

            if(!cinema) {
                res.status(404).json(initMessageObj(messages.cinemaNotFoundMessage));
            }
            res.status(205).json(initMessageObj(messages.removedCinemaMessage));
        } catch (err) {
            next(err);
        }
    }
};