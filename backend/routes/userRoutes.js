const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
