const mongoose = require("mongoose");

const lessonSpecificSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const topicProgressSchema = new mongoose.Schema({
  source: { type: String, required: true },
  topic: {
    type: String,
    required: true,
  },
  lessonProgress: {
    type: [lessonSpecificSchema],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    voxelPoints: { type: Number, default: 0 },
    courses: { type: Array },
    completedCourses: { type: Array },
    topicProbabilities: { type: Object },
    correctQuestions: { type: Array },
    wrongQuestions: { type: Array },
    feedbackExams: { type: Array },
    lesson: { type: [topicProgressSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
