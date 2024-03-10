const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examType: { type: String, required: true },

  examQuestions: { type: Array, required: true },

  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  userAnswers: {
    type: [String],
    default: [],
  },

  examModule: {
    type: String,
    required: true,
  },

  examTopic: {
    type: String,
  },

  mark: {
    type: Number,
  },
});

const examModel = mongoose.model("exams", examSchema);
module.exports = examModel;
