const User = require('../models/user')
const Room = require('../models/room')
const Topic = require('../models/topic')
exports.show = async (req, res, next)=>{
    const user =await User.findByPk(req.params.id,{
        include:[
            {
                model:Room,
                include:[
                    {model:User},
                    {model:Topic}
                ]
            }
        ],
        order:[[Room,'id', 'desc']]
    });
    if(user){
        const rooms = user.rooms;
        const topic = await Topic.findAll({
            include:[{
                model:Room
            }]
        });
    
        return res.render('profile/show', {profile:user, rooms:rooms, topic:topic});
    }else{
        return res.redirect('/')
    }
};