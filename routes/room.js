const express = require("express")

const Router = express.Router();

const roomController = require("../controller/room.js")

Router.get('/',roomController.getAll);
Router.get('/room/:id', roomController.show)

module.exports = Router;