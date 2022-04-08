const Room = require('../models/room.js')
const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const Message = require('../models/message')

const Sequelize = require('sequelize')
const Op = Sequelize.Op;



exports.getAll =async (req, res, next) =>{
    const topic = await Topic.findAll({
        include:[{
            model:Room
        }]
    });

    const q = req.query?.q || ''
    
    Room.findAll({
        where:{
            [Op.or]:[
                {    
                    title:{
                        [Op.like]: `%${q}%`
                    },
                },
                {
                    descreption:{
                        [Op.like]: `%${q}%`
                    }
                },
                {
                  '$topic.name$':{
                     [Op.like]: `%${q}%`
                    }
                }
            ]
        },
        order:[['id','DESC']],  
        include: [{model:Topic}, {model:User}]
    }).then((rooms)=>{
        res.render('room/index',{rooms:rooms, topic:topic, q:q})
    })
};

exports.show = (req, res, next) =>{    
    Room.findByPk(req.params.id,{
        include:[{model:User}, {model:Topic}, {model:Message,
            include:[
                {model:User},
             ],
        }],
        order:[[Message, 'id', 'DESC']]
    },
    ).then((room)=>{
        if (room){             
            res.render('room/show',{room:room})
        }
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
        if (room){
            if(room.userId == req.session.user['id'])
                res.render('room/create',{room:room})
        }
        else
            res.redirect('/')
    }).catch(()=>{
        return res.redirect('/')
    })
}

exports.store = async (req, res, next)=>{
    const [row, created] = await Topic.findOrCreate({
        where:{
            name:req.body.topicName
        }
    })

    Room.create({
        title:req.body.title,
        descreption: req.body.descreption,
        topicId:row.id,
        userId: req.session.user['id']
    })

    res.redirect('/room/create')
}


exports.update = (req, res, next)=>{

    Room.findByPk(req.params.id).then((room)=>{
        if(room.userId == req.session.user['id']){
            room.title = req.body.title;
            room.descreption = req.body.descreption;
            return room.save();
        }
        return '';
    }).then(()=>{
        res.redirect('/')
    }).catch(()=>{})
}

exports.delete = (req, res, next) =>{
    Room.findByPk(req.params.id).then((room)=>{
        if(room.userId== req.sessoin.user['id']){
            return room.destroy()
        }
        return '';
    }).then(()=>{
        return res.redirect('/')
    })
    .catch()
}