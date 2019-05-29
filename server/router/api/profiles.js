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
module.exports = router