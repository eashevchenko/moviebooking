const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');
const ViewerController = require('../controllers/viewerController');
const {validateParams, validateQuery, validateBody, schema} = require('../helpers/routeHelper');
const {authenticate, authWithRole} = require('../helpers/authHelper');
const userRoles = require('../enums/userRoles');

const {asyncCatchMiddleware}  = require('../middlewares/asyncMiddleware');
router.use(asyncCatchMiddleware(UsersController));

//documented in Swagger
router.route('/')
    .get([authenticate],
          UsersController.getUsers)
    .post([validateBody(schema.userSchema)],
           UsersController.createViewer);

//documented in Swagger
router.route('/viewers/info')
    .get([authenticate],
        ViewerController.getViewersInfo);

//documented in Swagger
router.route('/search')
      .get(UsersController.searchUser);

//documented in Swagger
router.route('/invite')
      .get([authWithRole([userRoles.MANAGER]),
            validateQuery(schema.inviteSchema, ['email'])],
            UsersController.inviteManager);

//documented in Swagger
router.route('/manager')
      .post([validateQuery(schema.managerSchema, ['code'])],
             UsersController.createManager);

//documented in Swagger
router.route('/list')
    .get([authWithRole([userRoles.MANAGER]),
          validateQuery(schema.paginateSchema, ['page', 'limit', 'sort'])],
          UsersController.getUsersByPagination);

//documented in Swagger
router.route('/:id')
    .get([authWithRole([userRoles.MANAGER]),
          validateParams(schema.idSchema, ['id'])],
          UsersController.getUser)
    .put([authWithRole([userRoles.MANAGER]),
          validateParams(schema.idSchema, ['id'])],
          UsersController.updateUser)
    .delete([authWithRole([userRoles.MANAGER]),
             validateParams(schema.idSchema, ['id'])],
             UsersController.removeUser);

//documented in Swagger
router.route('/notify')
    .post([authWithRole([userRoles.MANAGER])],
           UsersController.notifyUser);

module.exports = router;
