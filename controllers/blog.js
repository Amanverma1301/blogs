const mongoose =require("mongoose");
const {Schema, model}= require("mongoose");

 const blogschema =new Schema({
    title:{
        type: String,
        required:true,
    },
     body:{
        type: String,
        required:true,
    },
     name:{
        type: String,
        required:true,
    },
     kd:{
        type: String,
        required:true,
    },
     hr:{
        type: String,
        required:true,
    },
     age:{
        type: String,
        required:true,
    },
    region:{
        type: String,
        required:true,
    },
    
     coverimageurl:{
        type: String,
        required:false,
    },
    createdby:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
 },
{timestamps:true}) ;

module.exports = mongoose.model("blog", blogschema);
