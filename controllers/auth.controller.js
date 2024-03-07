//I need to write the controller / logic to register a user
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require("../configs/auth.config")
const user_model = require('../model/user.model')

exports.signup = async (req,res)=>{

    /* Logic to create the user */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the users collection in mongoDB database
    const userObj  = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password,8)
    }
    try{
        const user_created = await user_model.create(userObj)
        const res_obj  = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt
        }
        res.status(201).send(res_obj)
    }
    catch(err){
        console.log("Error while registering the user",err)
        res.status(500).send({
            message : "some error happened while registering the user"
        })   
    }
    //3. Return the response back to the user
}

exports.signin =async (req,res)=>{

    //check if userId is present 
    const user =await user_model.findOne({userId : req.body.userId})

    if(user  == null){
        res.status(400).send({
            message : "user  passed is not a valid userId"
        })
    }
    //password is correct 
    const isPasswordValid  = bcrypt.compareSync(req.body.password,user.password)

    if(!isPasswordValid){
        res.status(401).send({
            message: "wrong password passed"
        })
    }
    //using jwt we will create the access token with given ttl(time to live) and return 
    const token = jwt.sign( {id:user.userId},secret.secret,{
        expiresIn : 120
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token 
    })
}