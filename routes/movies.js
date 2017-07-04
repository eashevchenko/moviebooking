const express = require('express');
const router = express.Router();
const {validate, validateBody, schema} = require('../helpers/routeHelper');

const MoviesController = require('../controllers/movies');

//documented in Swagger
router.route('/')
    .get(MoviesController.getMovies)
    .post([validateBody(schema.movieSchema)], MoviesController.createMovie);

//documented in Swagger
router.route('/list')
    .get(MoviesController.getMoviesByPagination);

//documented in Swagger
router.route('/:id')
    .get([validate(schema.idSchema, 'id')], MoviesController.getMovieById)
    .put(MoviesController.updateMovie)
    .delete(MoviesController.removeMovie);

//documented in Swagger
router.route('/:id/showtimes')
      .get([validate(schema.idSchema, 'id')], MoviesController.getMovieShowTimes);

module.exports = router;
