const express = require('express');
const router = express.Router();

const MoviesController = require('../controllers/movies');

router.route('/')
    .get(MoviesController.getMovies)
    .post(MoviesController.createMovie);

router.route('/:id')
    .get(MoviesController.getMovieById)
    .put(MoviesController.updateMovie)
    .delete(MoviesController.removeMovie);

module.exports = router;
