const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const {validateBody, schema} = require('../helpers/routeHelper');

router.route('/')
    .post([validateBody(schema.authSchema)], AuthController.login);

module.exports = router;
