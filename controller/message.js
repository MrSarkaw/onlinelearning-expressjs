const Room = require('../models/room')
const Message = require('../models/message')


exports.store=async (req, res, next)=>{
    let check = await Room.findByPk(req.body.roomid)

    if(check){
        await Message.create({
            userId : req.session.user['id'],
            roomId:check.id,
            message:req.body.message
        })

    }
    
    return res.redirect('/room/show/'+check.id);
};


exports.destroy = async (req, res, next)=>{
  Message.findOne({
       where:{
           id:req.params.id,
           userId : req.session.user['id']
       },
       include:[{model:Room}]
   }).then((message)=>{
       message.destroy();

       return res.redirect('/room/show/'+message.room.id+'');
    }).catch(()=>{
       return res.redirect('/');
   });
   
}