const Room = require('../models/room.js')

exports.getAll = (req, res, next) =>{
    Room.findAll().then((rooms)=>{
        res.render('room/index',{rooms:rooms})
    })
};

exports.show = (req, res, next) =>{
    // let room = rooms.filter((data)=>{
    //     return data.id == req.params.id
    // })

    // res.render('room/show',{room:room})
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