const  productController = require("../controllers/product.controller")

module.exports = (app)=>{
    app.post("/e_comm/api/v1/product/createProduct",productController.CreateProduct)
}