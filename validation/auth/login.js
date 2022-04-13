const { body, validationResult } = require('express-validator');

module.exports = [
    body('email').isEmail().require(),
]