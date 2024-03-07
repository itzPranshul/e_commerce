//This will be starting file of the project 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const server_config= require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./model/user.model")
const bcrypt = require('bcryptjs')

app.use(express.json())//middleware- for some extra logic / 

mongoose.connect(db_config.DB_URL)//where to connect 

const db = mongoose.connection//connection order

db.on("error",()=>{
    console.log('error connecting to the mongo database')
})//for any error if occurs

db.once("open",()=>{
    console.log("connected to mongoDB")
    init()
})//when succesfully connected to the database

async function init(){
    const user =await user_model.findOne({userId : "admin"})
    if(user){
        console.log("Admin is already present")
        return
    }
    try {
        const user  = await user_model.create({
            name : "vishwa",
            userId : "admin",
            email : "kankvish@gmail.com",
            userType : "ADMIN",
            password : "welcome1"
        })
        console.log("Admin is created",user)
    }catch(err){
        console.log("Error while create admin",err)
    }
}

//stich the server to the route
require("./routes/auth.route")(app)

/* *start the server * */
app.listen(
    server_config.PORT,()=>{
    console.log("Server started at port number : ",server_config.PORT)
}
)