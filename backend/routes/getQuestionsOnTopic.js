// Gets questions for the Exam page based on the question ID and the specified Course + topics

const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {
  const { scopeQuery, moduleScope } = req?.body;
  console.log(scopeQuery, moduleScope);

  if (!scopeQuery || !moduleScope) {
    return res
      .status(400)
      .json({ Alert: "The scope or module scope is missing!" });
  }

  const questionData = await questionModel.find({
    questionID: {
      $regex: new RegExp(`^${moduleScope}_.*_${scopeQuery}$`),
    },
  });

  if (!questionData || questionData.length === 0) {
    res
      .status(400)
      .json({ Alert: "The question data is not matching any records." });
  } else {
    res.status(200).json(questionData);
  }
});

router.route("/getQuestionsForExam").post(async (req, res) => {
  const { topics } = req?.body;

  console.log("topics", topics);

  if (!topics || !Array.isArray(topics)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing topics query parameter" });
  }

  try {
    const questions = await questionModel.find({
      questionTopic: { $in: topics }, // Efficiently match against multiple topics
    });

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for the specified topics" });
    }

    res.json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
