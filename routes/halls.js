const express = require('express');
const router = express.Router();

const HallsController = require('../controllers/hall');
const {validate, validateBody, schema} = require('../helpers/routeHelper');

//documented in Swagger
router.route('/')
    .get(HallsController.getHalls);

//documented in Swagger
router.route('/list')
    .get(HallsController.getHallsByPagination);

//documented in Swagger
router.route('/:id')
    .get([validate(schema.idSchema, 'id')], HallsController.getHallById)
    .post([validate(schema.idSchema, 'id'),
           validateBody(schema.hallSchema)], HallsController.createHallByCinema);

//documented in Swagger
router.route('/:id/cinema')
    .get([validate(schema.idSchema, 'id')], HallsController.getHallCinema);

module.exports = router;
