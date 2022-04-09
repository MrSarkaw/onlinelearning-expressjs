const Room = require('../models/room')
const Message = require('../models/message')
const Particpant = require('../models/particpanties')

exports.store=async (req, res, next)=>{
    let check = await Room.findByPk(req.body.roomid)

    if(check){
        await Message.create({
            userId : req.session.user['id'],
            roomId:check.id,
            message:req.body.message
        })

      let data = await Particpant.findOne({
            where:{
                userId: req.session.user['id'],
                roomId: check.id
            }
        });

        if(!data){
            await Particpant.create({
                userId: req.session.user['id'],
                roomId: check.id
            });
        }
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