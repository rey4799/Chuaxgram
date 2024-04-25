



//npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,Role:string



//Users-id-username:string (optional)-email:string  (validation: required, uniq, email format)-password:string  (validation: required, length min 8)-Role:string (validation: in [‘buyer’, ‘seller’])



//    npx sequelize model:generate --name Profile --attributes fullName:string,bio:string,avatarUrl

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true })) 

app.use("/", require("./routers"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})