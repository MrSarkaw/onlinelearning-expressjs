const Room = require('../models/room.js')
const Topic = require('../models/topic.js');
const User = require('../models/user.js');

exports.getAll = (req, res, next) =>{
    Room.findAll({
        order:[['id','DESC']],  
        include: [{model:Topic}, {model:User}]
    }).then((rooms)=>{
        console.log(rooms)
        res.render('room/index',{rooms:rooms})
    })
};

exports.show = (req, res, next) =>{    
    Room.findByPk(req.params.id).then((room)=>{
        if (room)
            res.render('room/show',{room:room})
        else
            res.redirect('/')
    }).catch((err)=>{
        res.redirect('/')
    })
};

exports.create = async (req, res, next) =>{
    const topic = await Topic.findAll();
    const users = await User.findAll();

    res.render('room/create',{topic:topic, users:users})
}

exports.edit = (req, res, next) =>{
    Room.findByPk(req.params.id).then((room)=>{
        if (room)
            res.render('room/create',{room:room})
        else
            res.redirect('/')
    }).catch(()=>{
        return res.redirect('/')
    })
}

exports.store = (req, res, next)=>{

    Room.create({
        title:req.body.title,
        descreption: req.body.descreption,
        topicId:req.body.topicId,
        userId: req.body.userId
    })

    res.redirect('/room/create')
}


exports.update = (req, res, next)=>{

    Room.findByPk(req.params.id).then((room)=>{
        room.title = req.body.title;
        room.descreption = req.body.descreption;
        return room.save();
    }).then(()=>{
        res.redirect('/')
    }).catch(()=>{})
}

exports.delete = (req, res, next) =>{
    Room.findByPk(req.params.id).then((room)=>{
       return room.destroy()
    }).then(()=>{
        return res.redirect('/')
    })
    .catch()
}