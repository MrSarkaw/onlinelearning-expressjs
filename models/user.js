const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize')

const users = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    bio:{
        type:Sequelize.STRING,
        allowNull:true,
    }
})


module.exports = users;