const express = require("express");
const router = express.Router();

const examModel = require("../models/exam");
const userModel = require("../models/user");
const { default: mongoose } = require("mongoose");

router.route("/getExams").post(async (req, res) => {
  const { userId } = req.body;

  try {
    const examsByUser = await examModel.find({
      userRef: new mongoose.Types.ObjectId(userId),
    });

    let feedbackExams = [];
    let topicalExams = [];
    let pastPapersExams = [];

    for (exams of examsByUser) {
      if (exams.examType == "Feedback") {
        feedbackExams.push(exams);
      } else if (exams.examType === "Topical") {
        topicalExams.push(exams);
      } else if (exams.examType === "Past Paper") {
        pastPapersExams.push(exams);
      }
    }

    res.status(200).json({ feedbackExams, topicalExams, pastPapersExams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching exams" });
  }
});

module.exports = router;
