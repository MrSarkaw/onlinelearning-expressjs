const express = require('express')
const Router = express.Router();

const messageController = require('../controller/message')

const auth = require('../middleware/auth')

Router.post('/store/message', auth, messageController.store);
Router.get('/message/delete/:id', auth, messageController.destroy)

module.exports = Router;