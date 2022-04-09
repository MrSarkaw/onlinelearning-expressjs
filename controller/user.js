const User = require('../models/user')
const Room = require('../models/room')
const Topic = require('../models/topic')
const Message = require('../models/message')

exports.show = async (req, res, next)=>{
    const user =await User.findByPk(req.params.id,{
        include:[
            {
                model:Room,
                include:[
                    {model:User},
                    {model:Topic},
                ]
            },
            {
                model:Message,
                include:[
                    {model:User},
                    {model:Room}
                ],
                separate : true,
                limit:10
            }
        ],
        order:[[Room,'id', 'desc']]
    });
    if(user){

        const rooms = user.rooms;
        const messages = user.messages;

        const topic = await Topic.findAll({
            include:[{
                model:Room
            }]
        });

      
    
        return res.render('profile/show', {profile:user, rooms:rooms, topic:topic, messages:messages});
    }else{
        return res.redirect('/')
    }
};