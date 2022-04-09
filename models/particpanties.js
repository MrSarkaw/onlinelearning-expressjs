const Sequelize = require('sequelize')
const sequelize = require('../util/sequelize')

const particpanties = sequelize.define('particpanties', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    }
});

module.exports = particpanties;