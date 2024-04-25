const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const session = require('express-session')




app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use("/", require("./routers"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



/** */