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
    } else {
      res.status(200).json(theData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

router.route("/add").post(async (req, res) => {
  const {
    userId = "65e5ee3fa014a87ba21c66d2",
    newTopics,
    newProbability,
    correctAnswers,
    wrongAnswers,
  } = req?.body;

  if (!userId) return res.status(400).json({ Alert: "User ID required!" });

  try {
    const theData = await userModel.findById(userId);
    if (!theData) {
      return res.status(404).json({ Alert: `${userId} not found!` });
    } else {
      // theData.topicProbabilities.push({
      //   topics: newTopics,
      //   probability: newProbability,
      // });

      theData.topics.push([...newTopics]);
      theData.probability.push([...newProbability]);
      theData.correctAnswers.push([...correctAnswers]);
      theData.wrongAnswers.push([...wrongAnswers]);

      await theData.save();
      res.status(200).json({ Alert: theData });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = router;
