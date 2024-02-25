const express = require("express");
const router = express.Router();
const userModel = require("../models/user")

router.route("/").post(async (req, res) => {
    const userId = req?.session?.user?.id;
    const progress = req?.body?.progress;
    
    if (!progress) {
        return res.status(400).json({ Alert: "No progress!" });
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, { $push: { progress } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ Alert: "User not found!" });
        }

        return res.status(200).json({ Alert: "Updated!", user: updatedUser });
    } catch (error) {
        console.error("Error while updating:", error);
        return res.status(500).json({ Alert: "Error while updating!" });
    }
}).get(async (req,res)=>{
    const data = await userModel.find()

    if(!data || data.length===0){
        res.status(404).json({Alert:"No progress!"})
    }else{
        res.status(200).json(data);
    }
})




module.exports = router;