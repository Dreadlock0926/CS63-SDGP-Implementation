const express = require("express");
const router = express.Router();
const topicsModel = require("../models/topics");
const userModel = require("../models/user")


router.post("/", async (req, res) => {
    const theIndex = req.body.theIndex;  //this is an object
    if (!theIndex) return res.status(400).json({ Alert: "No Index Provided!" });

    try {
        //we could try getting the user Id using the session comparing and then update the user's collection with this data
        await userModel.incorrectSections.push(theIndex);
        await userModel.save(); 
        
        return res.status(200).json({Added:theIndex}); 
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ Alert: "Internal Server Error" }); 
    }
});


router.route("/personalized")



  module.exports = router;