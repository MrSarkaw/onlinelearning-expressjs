const express = require("express")

const Router = express.Router();

const roomController = require("../controller/room.js")
const auth = require('../middleware/auth')


Router.get('/',roomController.getAll);
Router.get('/room/show/:id', roomController.show)
Router.get('/room/edit/:id', auth, roomController.edit)
Router.post('/room/update/:id', auth, roomController.update)
Router.post('/room/delete/:id', auth, roomController.delete)
Router.get('/room/create', auth, roomController.create)
Router.post('/room/store', auth, roomController.store)

module.exports = Router;