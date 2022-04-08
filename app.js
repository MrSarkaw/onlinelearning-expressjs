const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require('express-session')
const sequelize = require("./util/sequelize")
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const csrf = require('csurf')
const moment = require('moment')
//model
const Room = require('./models/room')
const Topic = require('./models/topic')
const User = require('./models/user')
const Message = require('./models/message')



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
//using
app.use(roomRouter)
app.use(authRouter)

//relations
//usre

let confForParent = {foreignKey:{allowNull:false}};
User.hasMany(Room,confForParent)
User.hasMany(Message,confForParent)
//topic
Topic.hasMany(Room,confForParent)
//room
Room.hasMany(Message,confForParent)
//room
let confForModel = {constrains:true, onDelete:"cascade", foreignKey:{allowNull:false}}
Room.belongsTo(User, confForModel);
Room.belongsTo(Topic, confForModel);
//message
Message.belongsTo(Room, confForModel)
Message.belongsTo(User, confForModel)


//run app
sequelize.sync({force:true}).then(apps=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})