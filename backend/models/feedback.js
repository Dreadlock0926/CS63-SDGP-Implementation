const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  Username: String,
  examQuestions: Array,
  examAnswers: Array,
  examType: String,
  examModule: String,
  Mark: Integer,
});

const feedbackModel = mongoose.model("feedbacks",feedbackSchema);
module.exports = feedbackModel;