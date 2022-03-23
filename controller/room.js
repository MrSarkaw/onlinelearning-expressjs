const Room = require('../models/room.js')

exports.getAll = (req, res, next) =>{
    Room.findAll().then((rooms)=>{
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

exports.create = (req, res, next) =>{
    res.render('room/create')
}

exports.store = (req, res, next)=>{

    Room.create({
        title:req.body.title,
        descreption: req.body.description
    })

    res.redirect('/room/create')
}