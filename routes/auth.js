const express = require('express')

const Router = express.Router();

const authController = require('../controller/auth')

Router.get('/login', authController.loginPage);
Router.post('/login', authController.login);

Router.get('/register', authController.registerPage);
Router.post('/register', authController.register);

Router.post('/logout', authController.logout);

module.exports = Router;