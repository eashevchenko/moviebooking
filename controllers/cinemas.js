const Cinema = require('../model/cinema');

const {initMessageObj, messages} = require('../helpers/messageHelper');

module.exports = {

    getCinemas: async (req, res, next) => {
        try {
            const cinemas = await Cinema.find({});
            res.status(200).json(cinemas);
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

    getCinemaByTitle: async (req, res, next) => {
        try {
            const {title} = req.body;

            const cinema = await Cinema.find({
                title: title
            });

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

            res.status(200).json(cinemaHalls.halls.movies);

        } catch (err) {
            next(err);
        }
    },

    getCinemaMoviesByDate: async (req, res, next) => {
        try {
            const {id} = req.params;

            const options = {
                path: 'halls',
                model: 'hall',
                populate: {
                    path: 'movies',
                    model: 'movie'
                }
            };

            const cinemaMovies = await Cinema.findById(id).populate(options);

            console.log(cinemaMovies)
            if(!cinemaMovies) {
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
            res.status(205).json(initMessageObj(messages.cinemaNotFoundMessage));
        } catch (err) {
            next(err);
        }
    }
};