const express = require('express');
const router = express.Router();
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate} = require('../helpers/authHelper');

const MoviesController = require('../controllers/movies');

//documented in Swagger
router.route('/')
    .get(MoviesController.getMovies)
    .post([authenticate,
           validateBody(schema.movieSchema)],
           MoviesController.createMovie);

//documented in Swagger
router.route('/list')
    .get([validateQuery(schema.paginateSchema, ['sort'])],
          MoviesController.getMoviesByPagination);

//documented in Swagger
router.route('/:id')
    .get([validateParams(schema.idSchema, ['id'])],
          MoviesController.getMovieById)
    .put([authenticate,
          validateParams(schema.idSchema, 'id')],
          MoviesController.updateMovie)
    .delete([authenticate,
             validateParams(schema.idSchema, ['id'])],
             MoviesController.removeMovie);

//documented in Swagger
router.route('/:id/showtimes')
      .get([validateParams(schema.idSchema, ['id'])],
            MoviesController.getMovieShowTimes);

module.exports = router;
