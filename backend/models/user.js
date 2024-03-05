const mongoose = require("mongoose");

const examHistorySchema = new mongoose.Schema(
  {
    examHistory: {
      type: Object,
      quesArr: { type: Array },
      ansArr: { type: Array },
      incorrectAnsIndex: { type: Array },
      userExamID: { type: String },
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  examHistory: {
    type: [examHistorySchema],
    default: [],
  },
  correctAnswers: {
    type: Array,
    default: [],
  },
  wrongAnswers: {
    type: Array,
    default: [],
  }, // Array to hold exam history
  topics: {
    type: Array,
    default: [],
  },
  probability: { type: [Array], default: [] },
  photo: {
    type: String,
    default:
      "https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
