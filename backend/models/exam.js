const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  examType: { type: String, required: true},
  examQuestions: { type: Array, required: true },
});

const examModel = mongoose.model("exams", examSchema);
module.exports = examModel;
