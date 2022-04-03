const express = require('express')

const Router = express.Router();

const loginController = require('../controller/auth')

Router.get('/login', loginController.loginPage);
Router.get('/register', loginController.registerPage);


module.exports = Router;