const categoryModel = require("../model/categories.model")

exports.category = async (req,res)=>{
    const request_body = req.body

    //read the request
    const categoryObj= {
        name : request_body.name,
        desc : request_body.desc
    } 

    //crete in the database and sending response 
    try{
    //create category in the database
        const category_created = await categoryModel.create(categoryObj)
        
        const res_obj = {
            name : category_created.name,
            desc : category_created.desc
        }
        res.status(201).send(res_obj)

    }catch(err){
        console.log("some error happened while registering the user",err)
        res.status(400).send({
            message : "error happended while creating the category"
        })
}
}
//written by me 
// exports.getAllCategories = async (req,res)=>{

//     const categories = categoryModel.find()
//     const res_obj = {
//         name : categories.name,
//         desc : categories.desc
//     }
//     res.status(201).send(res_obj)
// }

exports.getAllCategories = async (req, res) => {
    try {
      // Find all categories in the database
      const categories = await categoryModel.find();
  
      // Send the categories data in the response
      res.status(200).send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

// exports.EditCategory= async (req,res)=>{
// try{
//     //reading the request body 
//     req_body = req.body
//     req_obj = {
//         name : req_body.name,
//         desc : req_body.desc
//     }
//     //found object which have same name as request
//     found_obj = categoryModel.findOne({name : req_obj.name})
    

//     //eddit the categoy/object 
//     res_obj = categoryModel.findByIdAndUpdate(
//         found_obj._id,
//         req_obj.desc,
//         {new : true}
//     );
//     //final response found by the category 
//     finalresponse ={
//         name :res_obj.name,
//         desc : res_obj.desc
//     }

//     res.status(501).send(finalresponse)

// }catch(err){
//     console.log("error while edit the category ",err)
//     res.status(500).send({
//         message : 'error happened while editting thr category'
//     })
// }   
// } 


exports.EditCategory = async (req, res) => {
    try {
      // 1. Validate request body:
      const { name, desc } = req.body;
      if (!name) {
        return res.status(400).send({ message: 'Missing required field: name' });
      }
  
      // 2. Find the category:
      const foundCategory = await categoryModel.findOne({ name });
      if (!foundCategory) {
        return res.status(404).send({ message: 'Category not found' });
      }
  
      // 3. Update the category:
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        foundCategory._id,
        { desc },
        { new: true }
      );
  
      // 4. Send a response with appropriate status code:
      res.status(200).send(updatedCategory); // Or res.status(204).send(); if no content returned
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  exports.DeleteCategory = async (req,res)=>{

    try{
        const {name} = req.body
        const found_category =await categoryModel.findOne({name})
        if(found_category==null){
            res.status(404).send({
                message : "category does not exist"
            })
        }
    deleted_category =await categoryModel.deleteOne({name})

    res.status(501).send(deleted_category)
  }catch(err){
    console.log(err)
     res.status(404).send({
        message : 'error while deletinf the category'
  })
  }
  }