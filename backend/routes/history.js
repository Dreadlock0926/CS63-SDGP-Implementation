const express = require("express");
const router = express.Router();
const historyModel = require("../models/history");

router.route("/").post(async (req, res) => {
    const { questionID } = req.body;
    console.log(questionID);
   
    if (!questionID) {
        return res.status(400).json({ Alert: "No ID!" });
    }

    try {
      
        const theData = [questionID];
        const created = await historyModel.create({ questionID: theData });
 
        if (created) {
            return res.status(201).json({ Created: created });
        } else {
            return res.status(400).json({ Alert: "Error!" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ Error: "Internal Server Error" });
    }
});


module.exports = router;