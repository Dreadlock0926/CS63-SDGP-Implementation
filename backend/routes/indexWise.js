const express = require("express");
const router = express.Router();
const topicsModel = require("../models/topics");

router.post("/", async (req, res) => {
    const theIndex = req.body.theIndex; 
    try {
        const data = await topicsModel.findOne({ topics: theIndex });
        if (!data) {
            return res.status(404).json({ Alert: "No data found!" });
        } else {
            return res.status(200).json(data); 
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ Alert: "Internal Server Error" }); 
    }
});



  module.exports = router;