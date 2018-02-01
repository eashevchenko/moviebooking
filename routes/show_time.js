const express = require('express');
const router = express.Router();

const ShowTimeController = require('../controllers/show_time');
const {validateParams, validateQuery, schema} = require('../middlewares/routeMiddleware');
const {authenticate, authWithRole} = require('../middlewares/authMiddleware');
const userRoles = require('../enums/userRoles');

const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');
router.use(asyncCatchMiddleware(ShowTimeController));

// documented in Swagger
router.route('/')
      .get(ShowTimeController.getShowTimes);

// documented in Swagger
router.route('/list')
    .get([validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
          ShowTimeController.getShowTimesByPagination);

// documented in Swagger
router.route('/:id')
      .get([validateParams(schema.idSchema, ['id'])],
            ShowTimeController.getShowTime)
      .post([authWithRole([userRoles.MANAGER]),
             validateParams(schema.idSchema, ['id'])],
             ShowTimeController.createShowTime);

module.exports = router;
