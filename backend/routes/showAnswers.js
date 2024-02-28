const express = require("express");
const router = express.Router();
const examHistory = require("../models/examHistory");

router.route("/").post(async (req, res) => {
        const examID = req.body.examID;
    if (!examID) return res.status(400).json({Alert:"No exam ID found!"});

    const data = await examHistory.findOne({examID});
    if(!data && data.length){
        res.status(200).json(data);
    }else{
        res.status(404).json({Alert:"No data!"})
    }
});

module.exports = router;