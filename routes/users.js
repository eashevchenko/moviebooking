const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const {validate, schema} = require('../helpers/routeHelper');

//documented in Swagger
router.route('/')
    .get(UsersController.getUsers)
    .post(UsersController.createUser);

//documented in Swagger
router.route('/list')
    .get(UsersController.getUsersByPagination);

//documented in Swagger
router.route('/:id')
    .get([validate(schema.idSchema, 'id')], UsersController.getUser)
    .put([validate(schema.idSchema, 'id')], UsersController.updateUser)
    .delete([validate(schema.idSchema, 'id')], UsersController.removeUser);

module.exports = router;
