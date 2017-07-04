const Movie = require('../model/movie');
const {initMessageObj, messages} = require('../helpers/messageHelper');
const {getDefaultValues} = require('../helpers/appHelper');

module.exports = {

    getMovies: async (req, res, next) => {
        try {
            const movies = await Movie.find({});
            res.status(200).json(movies);
        } catch (err) {
            next(err);
        }
    },

    getMoviesByPagination: async (req, res, next) => {
        try {

            const pageStr = req.param('page');
            const limitStr = req.param('limit');
            const sortStr = req.param('sort');

            const page = parseInt(pageStr) ||  getDefaultValues.defaultPage;
            const limit = parseInt(limitStr) || getDefaultValues.defaultLimit;
            const sort = sortStr || getDefaultValues.defaultSort;

            const skip = (page * limit) - limit;
            const paginatedHalls = await Movie.find({}).skip(skip).limit(limit).sort({ title: sort });
            res.status(200).json(paginatedHalls);
        } catch (err) {
            next(err);
        }
    },

    getMovieById: async (req, res, next) => {
            const {id} = req.params;
            const movie = await Movie.findById(id);
            res.status(200).json(movie);
    },

    getMovieShowTimes: async (req, res, next) => {
      try {
          const {id} = req.params;

          const options = {
            path: 'showTimes',
            select: {'start': 1, 'schedule': 1}
          };

          const movieShowTimes = await Movie.findById(id).populate(options);

          if(!movieShowTimes) {
              return res.status(404).json(initMessageObj(messages.movieNotFoundMessage));
          }

          res.status(200).json(movieShowTimes.showTimes);
      } catch (err) {
          next(err);
      }
    },

    createMovie: async (req, res, next) => {
        try {
            const movie = new Movie(req.body);
            const savedMovie = await movie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            next(err);
        }
    },

    updateMovie: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedMovie = await Movie.findByIdAndUpdate(id);
            res.status(200).json(updatedMovie);
        } catch(err) {
            next(err);
        }
    },

    removeMovie: async (req, res, next) => {
        try {
            const {id} = req.params;
            const movie = await Movie.findByIdAndRemove(id);
            res.status(205).json(initMessageObj(messages.movieNotFoundMessage));
        } catch (err) {
            next(err);
        }
    }
};