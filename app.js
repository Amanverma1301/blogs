require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const mongose= require("mongoose");
const userRoute = require("./route/user");
const cookieParser = require("cookie-parser")  ;
const {checkforauthentication}= require("./middleware/authentication");
const blogRoute = require("./route/blog");
const  Blog = require("./controllers/blog")
const PORT = process.env.PORT||8000;
mongose
.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log("mongoerror",err));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkforauthentication("token"));
app.use(express.static(path.resolve("./public")));

app.get('/',async(req ,res)=>{
    try {
        const allBlog = await Blog.find({});
    res.render("home",{
        user : req.user,
        blog:allBlog,
       
    });
     console.log(allBlog);
    } catch (error) {
        console.error(err);
        res.send("somethingwentwrong");
        
    }
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);


app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));