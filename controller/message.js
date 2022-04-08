const Room = require('../models/room')
const Message = require('../models/message')
exports.store=async (req, res, next)=>{
    let check = await Room.findByPk(req.body.roomid)
    if(check){
        await Message.create({
            userId : req.user.id,
            roomId:check.id,
            message:req.body.message
        })

    }
    
    return res.redirect('/room/show/'+req.body.roomId+'');
};