const express = require('express');
const router = express.Router();

const ViewerController = require('../controllers/viewerController');
const {authenticate} = require('../helpers/authHelper');

//documented in Swagger
router.route('/info')
    .get(ViewerController.getViewersInfo);

router.route('/photo')
    .put(ViewerController.uploadProfileImage);

module.exports = router;
