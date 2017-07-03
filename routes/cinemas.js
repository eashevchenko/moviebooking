const express = require('express');
const router = express.Router();

const CinemasController = require('../controllers/cinemas');
const {validate, schema} = require('../helpers/routeHelper');

router.route('/')
    .get(CinemasController.getCinemas)
    .post(CinemasController.createCinema);

router.route('/:id')
    .get(validate(schema.idSchema, 'id'), CinemasController.getCinemaById)
    .delete(validate(schema.idSchema, 'id'), CinemasController.removeCinema);

router.route('/:id/halls')
      .get(validate(schema.idSchema, 'id'), CinemasController.getCinemaHalls);

router.route('/:id/movies')
    .get(validate(schema.idSchema, 'id'), CinemasController.getCinemaMoviesByDate);

router.route('/title')
    .get(CinemasController.getCinemaByTitle);

module.exports = router;
