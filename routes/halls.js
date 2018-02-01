const express = require('express');
const router = express.Router();

const HallsController = require('../controllers/hall');
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authWithRole} = require('../helpers/authHelper');
const userRoles = require('../enums/userRoles');

const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');
router.use(asyncCatchMiddleware(HallsController));

//documented in Swagger
router.route('/')
      .get(HallsController.getHalls);

//documented in Swagger
router.route('/list')
      .get([validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
            HallsController.getHallsByPagination);

//documented in Swagger
router.route('/:id')
    .get([validateParams(schema.idSchema, ['id'])],
          HallsController.getHallById)
    .post([authWithRole([userRoles.MANAGER]),
           validateParams(schema.idSchema, ['id']),
           validateBody(schema.hallSchema)],
           HallsController.createHallByCinema);

//documented in Swagger
router.route('/:id/cinema')
      .get([validateParams(schema.idSchema, ['id'])],
            HallsController.getHallCinema);

module.exports = router;
