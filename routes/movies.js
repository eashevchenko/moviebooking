const express = require('express');
const router = express.Router();
const {validate, schema} = require('../helpers/routeHelper');

const MoviesController = require('../controllers/movies');

router.route('/')
    .get(MoviesController.getMovies)
    .post(MoviesController.createMovie);

router.route('/:id')
    .get(validate(schema.idSchema, 'id'), MoviesController.getMovieById)
    .put(MoviesController.updateMovie)
    .delete(MoviesController.removeMovie);

router.route('/:id/showtimes')
      .get(validate(schema.idSchema, 'id'), MoviesController.getMovieShowTimes);

module.exports = router;
