const express = require('express');
const router = express.Router();

const CinemasController = require('../controllers/cinemas');
const {validate, validateBody, schema} = require('../helpers/routeHelper');

//documented in Swagger
router.route('/')
      .get(CinemasController.getCinemas)
      .post([validateBody(schema.cinemaSchema)], CinemasController.createCinema);

//documented in Swagger
router.route('/list')
      .get(CinemasController.getCinemasByPagination);

//documented in Swagger
router.route('/:id')
      .get([validate(schema.idSchema, 'id')], CinemasController.getCinemaById)
      .delete([validate(schema.idSchema, 'id')], CinemasController.removeCinema);

//documented in Swagger
router.route('/:id/halls')
      .get([validate(schema.idSchema, 'id')], CinemasController.getCinemaHalls);

//documented in Swagger
router.route('/:id/movies/:from')
      .get([validate(schema.idSchema, 'id'),
            validate(schema.queryDateSchema, 'from')], CinemasController.getCinemaMoviesByDate);

module.exports = router;
