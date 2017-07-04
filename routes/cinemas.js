const express = require('express');
const router = express.Router();

const CinemasController = require('../controllers/cinemas');
const {validate, validateBody, schema} = require('../helpers/routeHelper');

router.route('/')
      .get(CinemasController.getCinemas)
      .post([validateBody(schema.cinemaSchema)], CinemasController.createCinema);

router.route('/list')
      .get(CinemasController.getCinemasByPagination);

router.route('/:id')
      .get([validate(schema.idSchema, 'id')], CinemasController.getCinemaById)
      .delete([validate(schema.idSchema, 'id')], CinemasController.removeCinema);

router.route('/:id/halls')
      .get([validate(schema.idSchema, 'id')], CinemasController.getCinemaHalls);

router.route('/:id/movies/:from')
      .get([validate(schema.idSchema, 'id'),
            validate(schema.queryDateSchema, 'from')], CinemasController.getCinemaMoviesByDate);

router.route('/title')
      .get(CinemasController.getCinemaByTitle);

module.exports = router;
