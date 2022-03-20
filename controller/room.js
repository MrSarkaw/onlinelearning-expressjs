let rooms = [
    {id:1, name:'is anyone want to learng js?'},
    {id:2, name:'is anyone want to learng design?'},
    {id:3, name:'is anyone want to learng php?'},
]
exports.getAll = (req, res, next) =>{
    res.render('room/index',{room:rooms})
};

exports.show = (req, res, next) =>{
    let room = rooms.filter((data)=>{
        return data.id == req.params.id
    })

    res.render('room/show',{room:room})
};