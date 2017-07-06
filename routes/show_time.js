const express = require('express');
const router = express.Router();

const ShowTimeController = require('../controllers/show_time');
const {validateParams, validateQuery, schema} = require('../helpers/routeHelper');
const {authenticate} = require('../helpers/authHelper');

// documented in Swagger
router.route('/')
      .get(ShowTimeController.getShowTimes);

// documented in Swagger
router.route('/list')
    .get([validateQuery(schema.paginateSchema, ['sort'])],
          ShowTimeController.getShowTimesByPagination);

// documented in Swagger
router.route('/:id')
      .get([validateParams(schema.idSchema, ['id'])],
            ShowTimeController.getShowTime)
      .post([authenticate,
             validateParams(schema.idSchema, ['id'])],
             ShowTimeController.createShowTime);

module.exports = router;
