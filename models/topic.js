const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize.js')

const Topic = sequelize.define('topic',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Topic;