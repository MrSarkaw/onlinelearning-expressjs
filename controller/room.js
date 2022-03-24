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
        descreption: req.body.descreption
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