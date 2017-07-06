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
           UsersController.createViewer);

//documented in Swagger
router.route('/invite')
      .get([authenticate,validateQuery(schema.inviteSchema, ['email'])], UsersController.inviteManager);

//documented in Swagger
router.route('/manager')
      .post([validateQuery(schema.managerSchema, ['code'])],UsersController.createManager);

//documented in Swagger
router.route('/list')
    .get([authenticate,
          validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
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
