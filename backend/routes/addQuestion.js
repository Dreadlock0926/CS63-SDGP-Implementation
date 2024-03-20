const express = require("express");
const router = express.Router();
const questionModel = require("../models/question");
const { topicsModel } = require("../models/topics");

router.route("/").post(async (req, res) => {
  const {
    questionID,
    questionTopic,
    questionsGrid,
    questionsFiguresGrid,
    answersTypeGrid,
    answersGrid,
    marksGrid,
    questionSource,
  } = req?.body;

  if (!questionID) {
    return res.status(400).json({ Alert: "Provide a question ID!" });
  }

  const doesQuestionExist = await questionModel.findOne({ questionID });

  if (!doesQuestionExist) {
    await questionModel.create({
      questionID,
      questionTopic,
      questionsGrid,
      questionsFiguresGrid,
      answersTypeGrid,
      answersGrid,
      marksGrid,
      questionSource,
    });

    return res.status(200).json({ Alert: `${questionID} Registered!` });
  } else {
    return res.status(409).json({ Alert: ` ${questionID} Already Exists!` });
  }
});

router.route("/getQuestionInfo").post(async (req, res) => {
  const { source } = req?.body;

  if (source != "Default") {
    if (!source)
      return res.status(400).json({ Alert: "The source is missing!" });
    const sourceData = await topicsModel.findOne({ source });

    if (!sourceData) {
      res
        .status(400)
        .json({ Alert: "The source data is not matching records." });
    } else {
      res.status(200).json(sourceData);
    }
  }
});

router.route("/getModules").get(async (req, res) => {
  try {
    const result = await topicsModel.find({}, "source");
    const sourcesArray = result.map((topic) => topic.source);
    res.json(sourcesArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
