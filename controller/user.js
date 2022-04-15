const User = require('../models/user')
const Room = require('../models/room')
const Topic = require('../models/topic')
const Message = require('../models/message')
const Particpant = require('../models/particpanties')

const bcrypt = require('bcrypt')
const Resize = require('../util/Resize')
const path = require('path')

const {validationResult} = require('express-validator')

exports.show = async (req, res, next)=>{
    const user =await User.findByPk(req.params.id,{
        include:[
            {
                model:Room,
                include:[
                    {model:User},
                    {model:Topic},
                    {model:Particpant}
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
            },
            
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

exports.edit = async (req, res, next)=>{
    const user = await User.findOne({where:{id:req.session.user['id']}});

    if(user){
        return res.render('profile/edit', {
            userProfile:user,
            oldValue:'',
            errorMessage:''
        })
    }
};

exports.update = async (req, res, next)=>{
  

  const user = await User.findOne({where:{id:req.session.user['id']}});
  const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.render('profile/edit',{
            userProfile:user,
            errorMessage:errors.array()
        });
    }
    let filename = user.image;
    if(req.file?.buffer){
        const imagePath = path.join(__dirname, '../public/images');
        const fileUpload = new Resize(imagePath);
        if (!req.file) {
            res.status(401).json({error: 'Please provide an image'});
        }
        filename = await fileUpload.save(req.file.buffer);
    }

    user.name = req.body.name;
    user.image = filename;
    user.email = req.body.email;
    user.bio = req.body.bio;
    if(req.body.password)
        user.password = await bcrypt.hash(req.body.password, 12);

    await user.save();

    req.session.user['image'] = filename;
    req.session.user['name'] = user.name;

    return res.redirect('/edit')

};