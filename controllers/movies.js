const Movie = require('../model/movie');

const MessageHelper = require('../helpers/messages');

module.exports = {

    getMovies: async (req, res, next) => {
        try {
            const movies = await Movie.find({});
            res.status(200).json(movies);
        } catch (err) {
            next(err);
        }
    },

    getMovieById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const movie = await Movie.findById(id);
            console.log(movie);
            res.status(200).json(movie);
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
            res.status(205).json(MessageHelper.initMessageObj(MessageHelper.messages.removedMovieMessage));
        } catch (err) {
            next(err);
        }
    }
};