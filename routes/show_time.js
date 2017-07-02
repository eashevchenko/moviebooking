const express = require('express');
const router = express.Router();

const ShowTimeController = require('../controllers/show_time');

router.route('/')
      .get(ShowTimeController.getShowTimes);

router.route('/:id')
      .get(ShowTimeController.getShowTime)
      .post(ShowTimeController.createShowTime);

module.exports = router;
