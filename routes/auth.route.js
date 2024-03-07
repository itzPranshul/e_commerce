
const authController= require ("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")

module.exports = (app)=>{
    //route for post call signup
    app.post("/e_comm/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)

    //route for POST call signin
    app.post("/e_comm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)

    
}