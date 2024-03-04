const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.route("/").post(async (req, res) => {
  const userId = req?.body?.userId;
  if (!userId) return res.status(400).json({ Alert: "User ID required!" });

  try {
    const theData = await userModel.findById(userId);
    if (!theData) {
      return res.status(404).json({ Alert: "User not found!" });
    }

    // Extract necessary information
    const examHistory = theData.examHistory.map((history) => ({
      type: history.type,
      correctQuestions: history.correctQuestions,
      incorrectQuestions: history.incorrectQuestions,
      questions: history.questions.map((question) => ({
        question: question.question,
        correctAnswer: question.correctAnswer,
        userAnswer: question.userAnswer,
      })),
    }));

    res.status(200).json(examHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

router.route("/add").post(async (req, res) => {
  const { userId, newTopics, newProbability } = req?.body;

  if (!userId) return res.status(400).json({ Alert: "User ID required!" });

  try {
    const theData = await userModel.findById(userId);
    if (!theData) {
      return res.status(404).json({ Alert: `${userId} not found!` });
    } else {
      await theData.topicProbabilities.set({
        topics: newTopics,
        probability: newProbability,
      });
      await theData.save();
      res.status(200).json({ Alert: "Added new resources!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = router;
