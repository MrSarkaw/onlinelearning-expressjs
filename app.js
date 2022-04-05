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
User.hasMany(Room,{foreignKey:{allowNull:false}})
//topic
Topic.hasMany(Room,{foreignKey: {allowNull: false}})
//room
Room.belongsTo(User,{constrains:true, onDelete:"cascade", foreignKey:{allowNull:false}});
Room.belongsTo(Topic,{constrains:true, onDelete:'cascade',foreignKey: {allowNull: false}});



//run app
sequelize.sync().then(apps=>{
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})