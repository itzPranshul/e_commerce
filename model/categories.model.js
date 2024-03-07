const mongoose = require('mongoose')

const category_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    }
},{timestamps : true,versionKey :false})

module.exports = mongoose.model("category",category_schema)