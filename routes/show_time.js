const express = require('express');
const router = express.Router();

const ShowTimeController = require('../controllers/show_time');
const {validate, schema} = require('../helpers/routeHelper');

// documented in Swagger
router.route('/')
      .get(ShowTimeController.getShowTimes);

// documented in Swagger
router.route('/list')
    .get(ShowTimeController.getShowTimesByPagination);

// documented in Swagger
router.route('/:id')
      .get([validate(schema.idSchema, 'id')], ShowTimeController.getShowTime)
      .post([validate(schema.idSchema, 'id')], ShowTimeController.createShowTime);

module.exports = router;
