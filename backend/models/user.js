const mongoose = require("mongoose");

const learningSchema = new mongoose.Schema(
  {
    source: { type: String },
    topic: {
      type: String,
    },
    lessonPages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const lessonSpecificSchema = new mongoose.Schema({
  lessonName: { type: String, default: "integrationArea" },
  completed: { type: Boolean, default: false },
});

const topicProgressSchema = new mongoose.Schema({
  source: { type: String, default: "p1" },
  topic: {
    type: String,
    default: "integration",
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
    learning: { type: [learningSchema] },
    lesson: { type: [topicProgressSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
