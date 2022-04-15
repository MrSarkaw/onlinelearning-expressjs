const {body} = require('express-validator')

module.exports =[
    body('title').notEmpty().withMessage('the room name is required').isLength({max:200}),
    body('topicName').notEmpty().withMessage('the topic name is required').isLength({max:200}),
    body('descreption').notEmpty().withMessage('the description is required'),
];