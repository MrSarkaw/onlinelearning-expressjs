const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

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


//run app
app.listen(3000)