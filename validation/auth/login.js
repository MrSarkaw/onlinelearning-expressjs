const { body } = require('express-validator');

module.exports = [
    body('email').isEmail().withMessage('must be email'),
    body('password').isLength({min:6}).withMessage('the password must grater than 6 charcter')
]