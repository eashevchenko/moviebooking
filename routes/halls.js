const express = require('express');
const router = express.Router();

const HallsController = require('../controllers/hall');
const {validate, validateBody, schema} = require('../helpers/routeHelper');

router.route('/')
    .get(HallsController.getHalls);

router.route('/list')
    .get(HallsController.getHallsByPagination);

router.route('/:id')
    .get([validate(schema.idSchema, 'id')], HallsController.getHallById)
    .post([validate(schema.idSchema, 'id'),
           validateBody(schema.hallSchema)], HallsController.createHallByCinema);

router.route('/:id/cinema')
    .get([validate(schema.idSchema, 'id')], HallsController.getHallCinema);

router.route('/title')
      .get(HallsController.getHallByTitle);

module.exports = router;
