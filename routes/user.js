const express = require('express')

const Router = express.Router();

const userController = require('../controller/user')

Router.get('/profile/:id', userController.show);


module.exports = Router;