const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.route("/save-exam-ref").post(async (req, res) => {
  const { examRef, userRef } = req?.body;

  if (!examRef || !userRef) {
    return res.status(400).json({ Alert: "Exam Ref Missing!" });
  }

  const validityExam = await userModel.updateOne(
    { _id: userRef },
    { $push: { exams: examRef } }
  );

  if (validityExam) {
    res.status(201).json([{ Alert: "Exam Ref Saved!" }]);
  }
});

router.route("/updateModuleProbabilities").post(async (req, res) => {
  const { username, topicProbabilities } = req?.body;

  console.log(username, topicProbabilities);

  if (!username || !topicProbabilities) {
    return res
      .status(400)
      .json({ Alert: "Username or Topic Probabilities Missing!" });
  }

  const validUser = await userModel.updateOne(
    { username: username },
    { $set: { topicProbabilities: topicProbabilities } }
  );

  if (validUser) {
    res.status(201).json([{ Alert: "Module Probabilities updated!" }]);
  }
});

router.route("/setModuleProbabilities").post(async (req, res) => {
  const { username, topicProbabilities, moduleID } = req?.body;

  console.log(username, topicProbabilities);

  if (!username || !topicProbabilities || !moduleID) {
    return res
      .status(400)
      .json({ Alert: "Username or Topic Probabilities Missing!" });
  }

  const updateObject = {};
  updateObject[`topicProbabilities.${moduleID}`] = topicProbabilities;

  const validUser = await userModel.updateOne(
    { username: username },
    { $set: updateObject }
  );

  if (validUser) {
    res.status(201).json([{ Alert: "Module Probabilities updated!" }]);
  }
});

router.post("/getUserById", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/intialiazeLessons", async (req, res) => {
  try {
    const { userId, newLessonProgress } = req.body; // Destructure user ID and new lesson progress

    if (!userId || !newLessonProgress) {
      return res
        .status(400)
        .send("Missing required fields: userId and newLessonProgress");
    }

    const userToUpdate = await userModel.findById(userId); // Find user by ID

    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }

    userToUpdate.lesson.push(newLessonProgress); // Append new lesson progress

    await userToUpdate.save(); // Save updated user document

    res.json(userToUpdate); // Return the updated user
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
