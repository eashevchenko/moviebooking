const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate} = require('../helpers/authHelper');

//documented in Swagger
router.route('/')
    .get([authenticate],
          UsersController.getUsers)
    .post([validateBody(schema.userSchema)],
           UsersController.createUser);

//documented in Swagger
router.route('/list')
    .get([authenticate,
          validateQuery(schema.paginateSchema, ['sort'])],
          UsersController.getUsersByPagination);

//documented in Swagger
router.route('/:id')
    .get([authenticate,
          validateParams(schema.idSchema, ['id'])],
          UsersController.getUser)
    .put([authenticate,
          validateParams(schema.idSchema, ['id'])],
          UsersController.updateUser)
    .delete([authenticate,
             validateParams(schema.idSchema, ['id'])],
             UsersController.removeUser);

module.exports = router;
