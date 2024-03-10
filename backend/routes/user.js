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

module.exports = router;
