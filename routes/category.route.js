const categoryController = require("../controllers/category.controller")
const authMw = require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/e_comm/api/v1/auth/category",[authMw.verifyToken],categoryController.category)

    app.get("/e_comm/api/v1/auth/getAllCategories",categoryController.getAllCategories)

    app.put("/e_comm/api/v1/auth/EditCategory",categoryController.EditCategory)

    app.delete("/e_comm/api/v1/auth/DeleteCategory",categoryController.DeleteCategory)
}