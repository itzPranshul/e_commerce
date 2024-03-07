const user_model = require('../model/user.model')
const auth_config = require('../configs/auth.config')
const verifySignUpBody =async (req,res,next)=>{
    try{
        //check for name
        if(!req.body.name){
            return res.status(400).send({

            })
        }
        //check for email
        if(!req.body.email){
            return res.status(400).send({
                message : "failed! Email was not provided in the request body"
            })
        }
        //check for userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "failed! userId was not provided in the request body"
            })
        }
        
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed ! user with same userId is already present"
            })
        }
        next()

    }catch(err){
        console.log("error while validating the request object ",err)
        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}

const verifySignInBody =async (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }

    next()
}

const verifyToken = async  (req,res,next)=>{
    //check if the token is present 
    const token = req.headers['x-access-token']
    if(!token){
        res.status(400).send({
            message : "no token found : unAuthorized"
        })
    }
    //if its the valid token 
    jwt.verify(token,auth_config.secret,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"unauthor"
            })
        }
        const user = await user_model.findOne({userId : decoded.id})
    })
    //then move to the next step 
    next()
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken

}

