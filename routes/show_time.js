const express = require('express');
const router = express.Router();

const ShowTimeController = require('../controllers/show_time');
const {validate, schema} = require('../helpers/routeHelper');


router.route('/')
      .get(ShowTimeController.getShowTimes);

router.route('/:id')
      .get(validate(schema.idSchema, 'id'), ShowTimeController.getShowTime)
      .post(validate(schema.idSchema, 'id'), ShowTimeController.createShowTime);

module.exports = router;
