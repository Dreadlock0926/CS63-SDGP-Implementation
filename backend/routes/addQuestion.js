const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {

  const { questionID,
          questionsGrid, questionsFiguresGrid, answersGrid, questionSource } = req?.body;
  
  if (!questionID) {

    return res.status(400).json({ Alert: "Provide a question ID!" });

  }

  const doesQuestionExist = await questionModel.findOne({ questionID });

  if (!doesQuestionExist) {

    await questionModel.create({ 
      questionID, questionsGrid,
      questionsFiguresGrid, answersGrid, questionSource 
    });

    return res.status(200).json({ Alert: `${questionID} Registered!` });

  } else {

    return res.status(409).json({ Alert: ` ${questionID} Already Exists!` });

  }

});

module.exports = router;
