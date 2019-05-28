/* eslint-disable no-console */
const express = require("express");
const User = require('../../model/user');
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken");
const router = express.Router();
router.get("/test", (req, res) => {
    res.json({
        msg: 'login works'
    })
})

router.post("/register", (req, res) => { 
    User.findOne({name: req.body.name})
        .then((user) => {
            if (user) {
                return res.status(400).json({ name: "邮箱已被注册"});
            } else {
            const saltRounds = 10;
            const newuser = new User({
                pwd: req.body.pwd,
                name: req.body.name
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
                          res.json({msg:"success"})
                      }else{
                          return res.status(400).json({pwd:'密码错误'})
                      }
                  })
        })
})
module.exports = router