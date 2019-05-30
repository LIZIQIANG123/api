/* eslint-disable no-console */
const express = require("express");
const Profiles = require('../../model/Profiles');
const passport = require('passport');
const router = express.Router();

router.get("/sss", (req, res) => {
    res.json({
        msg: 'login works'
    })
})
//添加
router.post("/add", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profiles = {

    };
    if (req.body.type) profiles.type = req.body.type;
    if (req.body.des) profiles.des = req.body.des;
    if (req.body.incode) profiles.incode = req.body.incode;
    if (req.body.expends) profiles.expends = req.body.expends;
    if (req.body.cash) profiles.cash = req.body.cash;
    if (req.body.remake) profiles.remake = req.body.remake;
    new Profiles(profiles).save()
        .then(pro => {
            res.json(pro)
        })

})

//获取所有信息
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profiles.find().then(pro => {
        if (!pro) {
            return res.status(404).json("没有任何内容")
        }
        res.json(pro)
    }).catch(er => {
        res.status(404).json(er)
    })
})
//获取单个信息
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profiles.findOne({
        _id: req.params.id
    }).then(pro => {
        if (!pro) {
            return res.status(404).json("没有任何内容")
        }
        res.json(pro)
    }).catch(er => {
        res.status(404).json(er)
    })
})
//编辑信息
router.post("/update/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profiles = {

    };
    if (req.body.type) profiles.type = req.body.type;
    if (req.body.des) profiles.des = req.body.des;
    if (req.body.incode) profiles.incode = req.body.incode;
    if (req.body.expends) profiles.expends = req.body.expends;
    if (req.body.cash) profiles.cash = req.body.cash;
    if (req.body.remake) profiles.remake = req.body.remake;
    Profiles.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: profiles
        }, {
            new: true
        })
        .then(pro => {
            res.json(pro)
        })

})
//删除
router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
   
        Profiles.remove(
            {'_id' : req.params.id}
        ).then(pro => {
           pro.save().then(pro=>{
               res.json(pro)
           })
        }).catch(er => {
            res.status(404).json(er)
        })
   
   
})
module.exports = router