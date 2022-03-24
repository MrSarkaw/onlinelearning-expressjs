const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const sequelize = require("./util/sequelize")
//model
const Room = require('./models/room')
const Topic = require('./models/topic')

const app = express()
//utils
app.set('view engine','ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}))
express.static(path.join(__dirname,'public'))


//routes
const roomRouter = require("./routes/room")

//using
app.use(roomRouter)

//relations
Room.belongsTo(Topic,{constrains:true, onDelete:'cascade'})
Topic.hasMany(Room)
//run app
sequelize.sync({force:true}).then(apps=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})