const express = require('express');
const router = express.Router();

const ViewerController = require('../controllers/viewerController');
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate, authWithRole} = require('../helpers/authHelper');
const userRoles = require('../enums/userRoles');

//documented in Swagger
router.route('/info')
    .get([authenticate],
        ViewerController.getViewersInfo);

module.exports = router;
