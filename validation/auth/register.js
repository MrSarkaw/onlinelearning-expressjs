const {body} = require('express-validator')

module.exports = [
    body('name').notEmpty().withMessage('name is required'),
    body('email').isEmail().withMessage('email is required'),
    body('password').isLength({min:6}).withMessage('the password must contain 6 character'),
    body('password_confirmation').custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match with password')
        }
        return true;
    })
]