const express = require('express');
const router = express.Router();
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate, authWithRole} = require('../helpers/authHelper');
const userRoles = require('../enums/userRoles');

const MoviesController = require('../controllers/movies');

const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');
router.use(asyncCatchMiddleware(MoviesController));

//documented in Swagger
router.route('/')
    .get(MoviesController.getMovies)
    .post([authWithRole(userRoles.MANAGER),
           validateBody(schema.movieSchema)],
           MoviesController.createMovie);

//documented in Swagger
router.route('/list')
    .get([validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
          MoviesController.getMoviesByPagination);

//documented in Swagger
router.route('/:id')
    .get([validateParams(schema.idSchema, ['id'])],
          MoviesController.getMovieById)
    .put([authWithRole([userRoles.MANAGER]),
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
