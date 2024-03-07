const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    category : {
        type : String, 
        required : true
    },
    description : {
        type : String,
        required : true
    }

},{timestamps : true,versionKey: false})

module.exports =mongoose.model( "Product",productModel)