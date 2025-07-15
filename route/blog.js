const { Router }= require("express");
const multer = require('multer');
const router = Router();
const path = require('path');
const Blog =require('../controllers/blog');
const Comment = require("../controllers/comment")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.resolve(`./public/upload/`))
  },
  filename: function (req, file, cb) {
    const filename =`${Date.now()}-${file.originalname}`
    cb(null,filename);
  },
})

const upload = multer({ storage: storage });


router.get("/add-new",(req,res)=>{
    return res.render("addblog",{
        user: req.user,
    });
});
router.post("/",upload.single('coverimage'),async(req,res)=>{
   const {title,body,name,kd,hr,region,age}=req.body;
 
  const blog = await Blog.create({
   title,
   body,
    name,
   kd,
   hr,
   region,
   age,
    
    createdBy:req.user._id,
    coverimageurl:`/upload/${req.file.filename}`,
  });
  
   return res.redirect(`/blog/${blog._id}`);
 
    });
  router.get("/:id",async (req,res) =>{
    try {
      const blog = await Blog.findById(req.params.id).populate("createdby");
    const comment = await Comment.find({blogid: req.params.id}).populate("createdby");
    
    console.log("blog",blog);
    res.render('blog',{
      user: req.user,
      blog,
      comment,
      
    })
    } catch (err) {
      console.error(err);
      res.status(500).send("something went wrong");
      
    }
  })  

  router.post("/comment/:blogid",async(req,res)=>{
       await Comment.create({
      content:req.body.content,
      blogid: req.params.blogid,
      createdby: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogid}`);
  });
  router.post("/blog/comment",async(req,res)=>{
    blogid = req.body.blogid;
  })


 module.exports = router;