// Gets questions for the Exam page based on the question ID and the specified Course + topics

const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {

    const { scope } = req?.body;

    if (!scope) return res.status(400).json({Alert: "The scope is missing!"});
    const questionData = await questionModel.find({questionID: {$regex: "w_2022_2"}});
  
    if (!questionData) {
      res.status(400).json({Alert: "The question data is not matching records."});
    } else {
      res.status(200).json(questionData);
    }


})

module.exports = router;
