const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {

  const { questionID, questionText, questionFigure, answerText } = req?.body;
  
  if (!questionID) {

    return res.status(400).json({ Alert: "Provide a question ID!" });

  }

  const doesQuestionExist = await questionModel.findOne({ questionID });

  if (!doesQuestionExist) {

    await questionModel.create({ questionID, questionText, questionFigure, answerText });

    return res.status(200).json({ Alert: `${questionID} Registered!` });

  } else {

    return res.status(409).json({ Alert: ` ${questionID} Already Exists!` });

  }

});

module.exports = router;
