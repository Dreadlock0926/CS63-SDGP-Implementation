const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  examType: { type: String, required: true},
  examQuestions: { type: Array, required: true },
  Username: String,
  examAnswers: Array,
  examType: String,
  examModule: String,
  Mark: Integer,
});

const examModel = mongoose.model("exams", examSchema);
module.exports = examModel;
