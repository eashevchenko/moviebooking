const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.route('/')
    .get(UsersController.getUsers)
    .post(UsersController.createUser);

router.route('/:id')
    .get(UsersController.getUser)
    .put(UsersController.updateUser)
    .delete(UsersController.removeUser);

module.exports = router;
