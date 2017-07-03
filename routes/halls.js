const express = require('express');
const router = express.Router();

const HallsController = require('../controllers/hall');
const {validate, schema} = require('../helpers/routeHelper');

router.route('/')
    .get(HallsController.getHalls);

router.route('/:id')
    .get(validate(schema.idSchema, 'id'), HallsController.getHallById)
    .post(HallsController.createHallByCinema);

router.route('/:id/cinema')
    .get(validate(schema.idSchema, 'id'), HallsController.getHallCinema);

router.route('/title')
      .get(HallsController.getHallByTitle);

module.exports = router;
