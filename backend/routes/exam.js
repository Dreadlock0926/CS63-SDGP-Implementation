const express = require("express");
const router = express.Router();
const examModel = require("../models/exam");
const userModel = require("../models/user"); // Import the userModel

router.route("/saveExam").post(async (req, res) => {
  const { examType, examQuestions, userRef, examModule, examTopic } = req?.body;

  if (!examType || !examQuestions || !userRef || !examModule || !examTopic) {
    return res.status(400).json({ Alert: "Exam Details Missing!" });
  }

  const validityExam = await examModel.create({
    examType,
    examQuestions,
    userRef,
    examModule,
    examTopic,
  });

  if (validityExam) {
    // Update user's examInfo after successful exam creation
    try {
      // let examTypeFormatted = `${examType}Exams`
      const updatedUser = await userModel.findByIdAndUpdate(userRef, {
        $push: { "feedbackExams": validityExam._id }, // Push exam object Id
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

router.route("/getExam").post(async (req, res) => {
  const { examRef } = req?.body;

  if (!examRef) {
    return res.status(400).json({ Alert: "The exam reference ID is missing." });
  }

  const examData = await examModel.findById(examRef);

  if (!examData) {
    res.status(400).json({Alert: "The question data is not matching records."});
  } else {
    res.status(200).json(examData);
  }
})

router.route("/updateExam").post(async (req, res) => {
  const { examRef, userRef, marks, totalMark, correctQuestions, wrongQuestions, userAnswers } = req?.body;

  if (!examRef) {
    return res.status(400).json({ Alert: "The exam reference ID is missing." });
  }

  if (!userRef) {
    return res.status(400).json({ Alert: "The user reference ID is missing." });
  }

  const examData = await examModel.findByIdAndUpdate(examRef, { mark: marks, totalMark: totalMark, userAnswers:userAnswers })

  let userData;

  if (correctQuestions.length > 0) {

    userData = await userModel.findByIdAndUpdate(userRef, {$pullAll: {wrongQuestions: correctQuestions}})
    userData = await userModel.findByIdAndUpdate(userRef, {$addToSet: { correctQuestions: {$each: correctQuestions} }})

  }

  if (wrongQuestions.length > 0) {

    userData = await userModel.findByIdAndUpdate(userRef, {$pullAll: {correctQuestions: wrongQuestions}})
    userData = await userModel.findByIdAndUpdate(userRef, {$addToSet: { wrongQuestions: {$each: wrongQuestions} }})

  }

  if (!examData || !userData) {
    res.status(400).json({Alert: "The exam data is not matching records."});
  } else {
    res.status(200).json(examData);
  }

})

module.exports = router;
