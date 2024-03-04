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
    type: [String],
    default: [],
  },
  wrongAnswers: {
    type: [String],
    default: [],
  }, // Array to hold exam history
  topicProbabilities: {
    topics: {
      type: Object,
      default: {},
    },
    probability: { type: [Number], default: [] },
  },
  photo: {
    type: String,
    default:
      "https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
