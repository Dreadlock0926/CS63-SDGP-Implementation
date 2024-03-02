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

router.route("/getAllQuestions").post(async (req, res) => {

  let { moduleID } = req?.body;

  if (!moduleID) return res.status(400).json({Alert: "The module ID is missing!"});
  let regExp = new RegExp("^" + moduleID)
  const moduleData = await questionModel.find({questionID: regExp});

  if (!moduleData) {
    res.status(400).json({Alert: "The question data is not matching records."});
  } else {
    res.status(200).json(moduleData);
  }

});

router.route("/:id").post(async (req, res) => {
  try {
    const id = req?.params?.id;
    const answer = req?.body?.answer;

    if (!id) return res.status(400).json({ Alert: "The question ID/Res ID is missing!" });

    const questionData = await questionModel.findById(id);

    if (!questionData) {
      return res.status(400).json({ Alert: "The question data is not matching records." });
    }

    const correctAnswer = questionData.answersGrid.find((gridItem) => gridItem === answer);

    if (correctAnswer) {
      return res.status(200).json({ Alert: "Correct!", marks: questionData.marks }); //we need to make the marks key!
    } else {
      return res.status(203).json({ Alert: "Invalid Ans", marks: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = router;
