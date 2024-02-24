const express = require("express");
const router = express.Router();
const userModel = require("../models/user")

router.route("/").post(async (req,res)=>{
    if(req.session.user){
        const userSpecific = await userModel.findById(req.session.user.id)
    const progress = req?.body?.progress;
    if(!progress) res.status(400).json({Alert:"No progress!"})

    const newProgress = await userSpecific.updateOne({progress})
    if(!newProgress){
        res.status(403).json({Alert:"error while updating!"})
    }else{
        res.status(200).json({Alert:"Updated!"})
    }
    }
    

})


module.exports = router;