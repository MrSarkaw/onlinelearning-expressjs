const express = require('express')

const Router = express.Router();
const Auth = require('../middleware/auth')
const editUserValidation = require('../validation/profile')

const userController = require('../controller/user')

Router.get('/profile/:id', userController.show);

Router.get('/edit', [Auth], userController.edit)
Router.post('/edit', [Auth, editUserValidation], userController.update)

module.exports = Router;