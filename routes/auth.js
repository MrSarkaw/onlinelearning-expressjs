const express = require('express')

const Router = express.Router();

const loginController = require('../controller/auth')

Router.get('/login', loginController.loginPage);

module.exports = Router;