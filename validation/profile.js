const {body} = require('express-validator')
const User = require('../models/user')
const {Op} = require('sequelize')

module.exports = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').custom(async (value, {req})=>{
       await User.findOne({where:{
            email:{
                [Op.eq]:value
            },
            id:{
                [Op.ne]: req.session.user['id']
            }
        }}).then((user)=>{
            if(user){
                return Promise.reject('this email has been taken before')
            }
        })
    }),
    body('password_confirmation').custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match with password')
        }
        return true;
    })
]