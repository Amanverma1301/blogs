const { createtoken,validatetoken } = require("../services/authentication");

 function checkforauthentication(cookiename){
    return(req,res,next)=>{
        const tokencookie = req.cookies[cookiename];
        if(!tokencookie){
           return  next();
        };
try {
    const userpayload = validatetoken(tokencookie);
 req.user = userpayload;
 res.locals.user=userpayload;
} catch (error) {
}    
 return  next();
};

 };
 module.exports = {
    checkforauthentication,
 };