const express = require("express");
const router = express.Router();

const examModel = require("../models/exam");
const userModel = require("../models/user");

router.route("/getExams").post(async (req, res) => {
  const { userId = "65fd130bc243afb3760aa723" } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let feedbackExams = [];
    let topicalExams = [];
    let pastPapersExams = [];

    for (let examId of user.feedbackExams) {
      const exam = await examModel.findById(examId);
      if (exam) {
        feedbackExams.push(exam);
      }
    }

    for (let examId of user.topicalExams) {
      const exam = await examModel.findById(examId);
      if (exam) {
        topicalExams.push(exam);
      }
    }

    for (let examId of user.pastPaperExams) {
      const exam = await examModel.findById(examId);
      if (exam) {
        pastPapersExams.push(exam);
      }
    }

    res.status(200).json({ feedbackExams, topicalExams, pastPapersExams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching exams" });
  }
});

module.exports = router;
