const express = require('express');
const router = express.Router();

const CinemasController = require('../controllers/cinemas');
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate}  = require('../helpers/authHelper');

//documented in Swagger
router.route('/')
      .get(CinemasController.getCinemas)
      .post([authenticate,
             validateBody(schema.cinemaSchema)],
             CinemasController.createCinema);

//documented in Swagger
router.route('/list')
      .get([validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
            CinemasController.getCinemasByPagination);

//documented in Swagger
router.route('/:id')
      .get([validateParams(schema.idSchema, 'id')],
            CinemasController.getCinemaById)
      .delete([authenticate,
               validateParams(schema.idSchema, ['id'])],
               CinemasController.removeCinema);

//documented in Swagger
router.route('/:id/halls')
      .get([validateParams(schema.idSchema, ['id'])],
            CinemasController.getCinemaHalls);

//documented in Swagger
router.route('/:id/movies/:from')
      .get([validateParams(schema.idSchema, ['id']),
            validateParams(schema.queryDateSchema, ['from'])],
            CinemasController.getCinemaMoviesBetweenDates);

router.route('/:id/movies')
    .get([validateParams(schema.idSchema, ['id']),
          validateQuery(schema.queryDatesSchema, ['from', 'to'])],
          CinemasController.getCinemaMoviesBetweenDates);

module.exports = router;
