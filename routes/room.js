const express = require("express")

const Router = express.Router();

const roomController = require("../controller/room.js")

Router.get('/',roomController.getAll);
Router.get('/room/show/:id', roomController.show)
Router.get('/room/edit/:id', roomController.edit)
Router.put('/room/update/:id', roomController.update)
Router.get('/room/create', roomController.create)
Router.post('/room/store', roomController.store)

module.exports = Router;