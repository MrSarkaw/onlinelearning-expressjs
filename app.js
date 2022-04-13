const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require('express-session')
const sequelize = require("./util/sequelize")
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const csrf = require('csurf')
const moment = require('moment')
const flash = require('connect-flash')
//model
const Room = require('./models/room')
const Topic = require('./models/topic')
const User = require('./models/user')
const Message = require('./models/message')
const Particpant = require('./models/particpanties.js')


const app = express()
//utils
app.set('view engine','ejs')
app.set('views', 'views')

app.use(session({
    secret:"session for online learning web App2022",
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave:false,
    saveUninitialized:false,
}))

// app.use(flash)

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname+'/public')))


const Csrf = csrf()

app.use(Csrf)

app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLogged;
    res.locals.user = req.session?.user || null;
    res.locals.csrf = req.csrfToken()
    res.locals.moment = moment

    next();
});


//routes
const roomRouter = require("./routes/room")
const authRouter = require('./routes/auth')
const messageRouter = require('./routes/message')
const userRouter = require('./routes/user')
//using
app.use(roomRouter)
app.use(authRouter)
app.use(messageRouter)
app.use(userRouter)

//relations
//usre

let confForParent = {constrains:true, onDelete:"cascade", foreignKey:{allowNull:false}}
User.hasMany(Room, confForParent)
User.hasMany(Message, confForParent)
User.hasMany(Particpant, confForParent)

//topic
Topic.hasMany(Room, confForParent)

//room
Room.hasMany(Message, confForParent)
Room.hasMany(Particpant, confForParent)
Room.belongsTo(User);
Room.belongsTo(Topic);

//message
Message.belongsTo(Room)
Message.belongsTo(User)

//particpanties
Particpant.belongsTo(User)
Particpant.belongsTo(Room)

//run app
sequelize.sync().then(apps=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})