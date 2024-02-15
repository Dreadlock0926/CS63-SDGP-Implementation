// Gets questions for the Exam page based on the question ID

const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {

  const { questionID } = req?.body;

    if (!questionID) return res.status(400).json({Alert: "The question ID is missing!"});
    const questionData = await questionModel.findOne({questionID});
  
    if (!questionData) {
  
      res.status(400).json({Alert: "The question data is not matching records."});
  
    } else {
  
      res.status(200).json(questionData);
  
    }


})

module.exports = router;
