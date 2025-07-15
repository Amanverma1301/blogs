
const mongoose =require("mongoose");
const {Schema, model}= require("mongoose");
const commentschema =new Schema({
   content:{
        type: String,
        required:true,
    },
     blogid:{
        type: Schema.Types.ObjectId,
        ref:"blog",
    },
    
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
 },
{timestamps:true}) ;
module.exports = mongoose.model("comment",commentschema);
