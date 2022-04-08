const express = require('express')
const Router = express.Router();

const messageController = require('../controller/message')

const auth = require('../middleware/auth')

Router.post('/store', auth, messageController.store);


module.exports = Router;