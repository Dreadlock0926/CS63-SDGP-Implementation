const express = require("express");
const router = express.Router();
const userModel = require("../models/user")


router.route("/").post((req,res)=>{
    const {username,password,progress} = req?.body;
    if(!username || !password) return res.status(400).json({Alert:"NO username/password!"})

    


})

module.exports= router;