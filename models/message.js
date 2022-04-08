const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize')

const message = sequelize.define('messages', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    }
})


module.exports = message