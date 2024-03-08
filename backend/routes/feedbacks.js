const express = require("express");
const router = express.Router();
const feedbackModel = require("../models/feedback");

router.route("/").get(async (req, res) => {
  try {
    const theData = await feedbackModel.find();
    if (theData && theData.length) {
      res.status(200).json(theData);
    } else {
      res.status(404).json({ Alert: "No Data in feedbacks!" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
