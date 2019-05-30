/* eslint-disable no-console */
const express = require("express");
const User = require('../../model/user');
const keys = require('../../config/key');
const passport = require('passport');


const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const router = express.Router();
router.get("/test", (req, res) => {
    res.json({
        msg: 'login works'
    })
})
//注册
router.post("/register", (req, res) => { 
    User.findOne({name: req.body.name})
        .then((user) => {
            if (user) {
                return res.status(400).json({ name: "邮箱已被注册"});
            } else {
            const saltRounds = 10;
            const newuser = new User({
                pwd: req.body.pwd,
                name: req.body.name,
                Identity:req.body.Identity
            })
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(newuser.pwd, salt, function (err, hash) {
                    if (err) throw err;
                    newuser.pwd=hash;
                    
                    newuser.save()
                        .then(user => res.json(user))
                        .catch(err=> console.log(err))
                })
            })
        }
    })
})
//登录
router.post('/login',(req,res)=>{
    const name=req.body.name;
    const pwd=req.body.pwd;
    User.findOne({name})
        .then(user=>{
            if(!user){
                return res.status(404).json({name:'用户不存在'});
            }
            bcrypt.compare(pwd, user.pwd)
                  .then(isMatch=>{
                      if(isMatch){
                          const rule={id:user.id,name:user.name,Identity:user.Identity};
                          jwt.sign(rule,keys.secretOrkey,{expiresIn:3600},(err,token)=>{
                              res.json({success:true,token:'Bearer '+token})
                          })
                      }else{
                          return res.status(400).json({pwd:'密码错误'})
                      }
                  })
        })
})
//获取用户信息
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
res.json({
    id:req.user.id,
    name:req.user.name,
    Identity:req.user.Identity
})
})
module.exports = router