const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  userAnswer: { type: String },
});

const examTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., p1, s1, etc.
  topicProbabilities: { type: Map, of: Number, default: {} }, // Topic probabilities for this exam type
});

const examHistorySchema = new mongoose.Schema(
  {
    type: String, // Type of exam, e.g., p1, s1, etc.
    questions: [questionSchema], // Array to hold every question
    correctQuestions: { type: Number, default: 0 }, // Number of correct questions
    incorrectQuestions: { type: Number, default: 0 }, // Number of incorrect questions
    userExamID: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  examHistory: [examHistorySchema], // Array to hold exam history
  examTypes: [examTypeSchema], // Array to hold different exam types and their topic probabilities
  topicProbabilities: {
    topic: {
      type: Array,
      default: [],
    },
    probability: { type: Array, default: [] },
  },
  photo: {
    type: String,
    default: "https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
