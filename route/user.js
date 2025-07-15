const { Router }= require("express");
const express = require("express");
const router = Router();
const User = require("../controllers/user")
 router.get('/signin',(req,res)=>{
  return res.render("signin");
 })
router.get('/signup',(req,res)=>{
  return res.render("signup");
 })



 
     router.post('/signin',async (req,res)=>{
       try {
         const { email, password} =  req.body;
    
        const token = await  User.matchpassword(email, password);
      
      return res.cookie("token",token).redirect("/");
       } catch (error) {
        return res.render("signin",{
        error:"incorrect password"
       });
      }
     });
      router.post('/signup',async (req,res)=>{
    const {fullname, email, password} =  req.body;
    await User.create({
        fullname,
        email,
        password,
    });

 
  return res.redirect("/");
 })
  router.get('/logout',(req,res)=>{
    console.log("loging out");
      res.clearCookie("token");
      res.redirect("/");
 
 });
 module.exports = router;