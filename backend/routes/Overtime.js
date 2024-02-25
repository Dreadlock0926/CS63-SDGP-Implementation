const express = require("express");
const router = express.Router();
const userModel = require("../models/user")

router.route("/").post(async (req,res)=>{
    // const userSpecific = await userModel.findById(req.session.user.id)
        const userSpecific = await userModel.find();
    const progress = req?.body?.progress;
    if(!progress) res.status(400).json({Alert:"No progress!"})

    const newProgress = await userSpecific.updateOne({progress})
    if(!newProgress){
        res.status(403).json({Alert:"error while updating!"})
    }else{
        res.status(200).json({Alert:"Updated!"})
    }
   
    

}).get(async (req,res)=>{
    const data = await userModel.find()

    if(!data){
        res.status(404).json({Alert:"No progress!"})
    }else{
        res.status(200).json(data);
    }
})




module.exports = router;