// Gets questions for the Exam page based on the question ID and the specified Course + topics

const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");

router.route("/").post(async (req, res) => {
  const { selectedSeason, selectedYear, selectedVariant, selectedModule } =
    req?.body;

  if (!selectedSeason || !selectedYear || !selectedVariant || !selectedModule) {
    return res.status(400).json({ Alert: "Missing required parameters." });
  }

  const questionData = await questionModel.find({
    $and: [
      {
        questionID: {
          $regex: `${selectedSeason}_${selectedYear}_${selectedVariant}`,
        },
      },
      { questionID: { $regex: `${selectedModule}_` } },
    ],
  });

  if (!questionData) {
    res
      .status(400)
      .json({ Alert: "The question data is not matching records." });
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
