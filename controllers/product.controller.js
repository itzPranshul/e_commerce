const productModel = require("../model/product.model")

exports.CreateProduct = async (req,res)=>{
    
        req_body = req.body

        req_obj = {
            name : req_body.name,
            category : req_body.category,
            description : req_body.description
        }
        try{
        obj_created =await productModel.create(req_obj)
        res_obj = {
            name : obj_created.name,
            category : obj_created.category,
            description : obj_created.description
        }
        res.status(501).send(res_obj)
    }catch(err){
        console.log(err)
        res.status(404).send({
            message : "error while creating the product"
        })
    }
}

