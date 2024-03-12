const express = require("express");
const router = express.Router();
const topicsModel = require("../models/topics");

router.route("/").post(async (req, res) => {

  const { sourceKey } = req?.body;

    if (!sourceKey) return res.status(400).json({Alert: "The topic source is missing!"});
    const topicData = await topicsModel.findOne({sourceKey});
  
    if (!topicData) {
  
      res.status(400).json({Alert: "The question data is not matching records."});
  
    } else {
  
      res.status(200).json(topicData);
  
    }


});

module.exports = router;
