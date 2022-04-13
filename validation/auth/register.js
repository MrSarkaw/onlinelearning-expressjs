const {body} = require('express-validator')
const User  = require('../../models/user')
module.exports =  [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required').custom(async(value)=>{
       await User.findOne({where:{email:value}}).then((user)=>{
           if(user){
               return Promise.reject('email already has been taken')
           }
        })
    }),
    body('password').isLength({min:6}).withMessage('the password must contain 6 character'),
    body('password_confirmation').custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match with password')
        }
        return true;
    })
]