const express = require('express')

const Router = express.Router();

const authController = require('../controller/auth')

Router.get('/login', authController.loginPage);
Router.get('/register', authController.registerPage);
Router.post('/register', authController.register);

module.exports = Router;