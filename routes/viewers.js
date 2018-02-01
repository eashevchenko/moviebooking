const express = require('express');
const router = express.Router();

const ViewerController = require('../controllers/viewerController');
const {authenticate} = require('../middlewares/authMiddleware');

const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');
router.use(asyncCatchMiddleware(ViewerController));

//documented in Swagger
router.route('/info')
    .get(ViewerController.getViewersInfo);

router.route('/photo')
    .put(ViewerController.uploadProfileImage);

module.exports = router;
