const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const {validateBody, schema} = require('../helpers/routeHelper');
const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');

router.use(asyncCatchMiddleware(AuthController));

router.route('/')
    .post([validateBody(schema.authSchema)], AuthController.login);

module.exports = router;
