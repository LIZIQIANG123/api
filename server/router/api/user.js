const express=require("express");
const user=require('../../model/user');
const  bcrypt = require (' bcryptjs ')
const router=express.Router();
router.get("/test",(req,res)=>{
    res.json({msg:'login works'})
})

router.post("/register",(req,res)=>{
   user.findOne({email:req.body.email}).then((user)=>{
       if(user){
           return res.status(400).json({email:"邮箱已被注册"});
       }
       else{
           const newuser=new user({
               email:req.body.email,
                pwd:req.body.pwd,

           })
       }
   })
})
module.exports=router