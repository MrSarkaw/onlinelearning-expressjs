const Sequelize = require('sequelize')

const sequelize = new Sequelize('onlinelearning', 'root', '', {dialect:'mysql', host:'localhost'})

module.exports = sequelize