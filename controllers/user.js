const mongoose =require("mongoose");
const {createHmac,randomBytes} = require("crypto");
const {Schema, model}=require("mongoose");
const { type } = require("os");
const {createtoken, validatetoken}= require("../services/authentication");

const userSchema = new Schema({
    fullname:{
        type: String,
        required:true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
       
    },
    password:{
        type: String,
        required: true,
    },
    profileImage:{
        type:String,
        default: "/public/download.png",

    },
    role:{
        type: String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},
{timestamps : true}
)
userSchema.pre('save',function(next){
const user =this;
if(!user.isModified("password")) return;
const salt ="somesalt";
const hashpassword = createHmac("sha256",salt)
  .update(user.password)
  .digest("hex");

this.salt = salt;
this.password = hashpassword;
next();
});
userSchema.static("matchpassword",async function(email,password){
    const user= await this.findOne({email});
    if (!user) throw new Error('user not found!');
   
   
    const salt =user.salt;
    const hashpassword =user.password;
   
    const userproviderhash = createHmac("sha256",salt)
  .update(password)
  .digest("hex");

  if(hashpassword!== userproviderhash){
    throw new Error('incorrect password');
    console.log("hello world")
  }
  const token = createtoken(user);
  return token;
  
})

const User = model("user",userSchema);
module.exports = User;