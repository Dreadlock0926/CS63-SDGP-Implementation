const express = require("express");
const router = express.Router();
const examModel = require("../models/exam");
const userModel = require("../models/user"); // Import the userModel

router.route("/save-exam").post(async (req, res) => {
  const { examType, examQuestions, userRef, mark, examModule } = req?.body;

  if (!examType || !examQuestions || !userRef || !mark || !examModule) {
    return res.status(400).json({ Alert: "Exam Details Missing!" });
  }

  const validityExam = await examModel.create({
    examType,
    examQuestions,
    userRef,
    examModule,
    mark,
  });

  if (validityExam) {
    // Update user's examInfo after successful exam creation
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userRef, {
        $push: { "progress.examHistory.examInfo": validityExam._id }, // Push exam object Id
      });

      if (updatedUser) {
        res.status(201).json([{ Alert: "Exam Saved!" }]);
      } else {
        // Handle error if user update fails
        console.error("Error updating user exam history");
        res.status(500).json({ Alert: "Internal Server Error!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ Alert: "Internal Server Error!" });
    }
  }
});

module.exports = router;
