const Room = require('../models/room.js')
const Topic = require('../models/topic.js');
const User = require('../models/user.js');
const Message = require('../models/message')
const Particpant = require('../models/particpanties')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const {validationResult} = require('express-validator')

exports.getAll =async (req, res, next) =>{
    const topic = await Topic.findAll({
        include:[{
            model:Room
        }]
    });

    const q = req.query?.q || ''
    
    const messages =await Message.findAll({
        order:[['id','desc']],
        include:[{model:User}, {model:Room}],
        limit:10
    });


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
        include: [
                    {model:Topic}, 
                    {model:User},
                    {model:Particpant}
                ]
    }).then((rooms)=>{
        res.render('room/index',{rooms:rooms, topic:topic, q:q, messages:messages})
    })
};

exports.show = (req, res, next) =>{    
    Room.findByPk(req.params.id,{
        include:[
            {model:User}, 
            {model:Topic}, 
            {model:Message,
                include:[
                    {model:User},
                ],
            },
            {
                model:Particpant,
                include:[
                    {model:User}
                ]
            }
        ],
        order:[[Message, 'id', 'DESC']]
    },
    ).then((room)=>{
        console.log(room)
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

   return res.render('room/create',{
        topic:topic,
        errorMessage:''
    })
}

exports.store = async (req, res, next)=>{


    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const topic = await Topic.findAll();
       return res.render('room/create',{
            topic:topic,
            errorMessage:errors.array()
        })
    }

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

    res.redirect('/')
}

let UpdateOrEdit = async (req, res, errorMessage)=>{
        const topic = await Topic.findAll();
        Room.findByPk(req.params.id,{
            include:[{model:Topic}]
        }).then((room)=>{
            if (room){
                if(room.userId == req.session.user['id']){
                     res.render('room/create',{room:room, topic:topic, errorMessage:errorMessage})
                }
            }
            else
               res.redirect('/')
    }).catch(()=>{
        return res.redirect('/')
    })
}

exports.edit = async (req, res, next) =>{
   UpdateOrEdit(req, res, '');
}

exports.update = async (req, res, next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return UpdateOrEdit(req, res, errors.array())
    }

    const [row, created] = await Topic.findOrCreate({
        where:{
            name:req.body.topicName
        }
    })
    Room.findByPk(req.params.id).then((room)=>{
        if(room.userId == req.session.user['id']){
            room.title = req.body.title;
            room.descreption = req.body.descreption;
            room.topicId = row.id;
            return room.save();
        }
        return '';
    }).then(()=>{
        res.redirect('/')
    }).catch(()=>{})
}

exports.delete = (req, res, next) =>{
    Room.findByPk(req.params.id).then((room)=>{
        if(room.userId== req.session.user['id']){
            return room.destroy()
        }
        return '';
    }).then(()=>{
        return res.redirect('/')
    })
    .catch()
}