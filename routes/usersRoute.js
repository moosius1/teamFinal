const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');

const usersController = require('../controllers/usersController')

router.get('/', usersController.getAllUsers);

router.get('/:id',  usersController.getOneUser);

router.post('/', validation.saveUser, usersController.addUser);

router.put('/:id', validation.saveUser, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;