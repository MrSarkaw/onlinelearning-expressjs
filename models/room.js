const Sequelize = require("sequelize")
const sequelize = require('../util/sequelize.js')


const Room = sequelize.define('room',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title:Sequelize.STRING,
    descreption:Sequelize.STRING,
})

module.exports = Room;