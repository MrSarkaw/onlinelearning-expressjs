const express = require('express')

const Router = express.Router();

const authController = require('../controller/auth')
const guest = require('../middleware/guest')
const auth = require('../middleware/auth')

Router.get('/login', guest, authController.loginPage);
Router.post('/login', guest, authController.login);

Router.get('/register', guest, authController.registerPage);
Router.post('/register', guest, authController.register);

Router.post('/logout', auth, authController.logout);

module.exports = Router;