const express = require("express");
const router = express.Router();
const topicsModel = require("../models/topics");

router.post("/", async (req, res) => {
    const theIndex = req.body.theIndex; 
    if (!theIndex) {
        return res.status(400).json({ Alert: "No index provided!" }); 
    }

    try {
        const theTopics = await topicsModel.find({}); 
        const data = theTopics.find(topic => topic.topics === theIndex);
        //so the approach above is NOT working
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