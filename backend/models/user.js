const mongoose = require("mongoose");

const lessonSpecificSchema = new mongoose.Schema({
  lessonName: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const topicLessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  lessonProgress: {
    type: [lessonSpecificSchema],
    required: true,
  },
});

const topicProgressSchema = new mongoose.Schema({
  source: { type: String, required: true },
  topicRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics",
    required: true,
  },
  topicLesson: {
    type: [topicLessonSchema],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    voxelPoints: { type: Number, default: 0 },
    completedCourses: { type: Array },
    topicProbabilities: { type: Object },
    correctQuestions: { type: Array },
    wrongQuestions: { type: Array },
    feedbackExams: { type: Array },
    lesson: { type: [topicProgressSchema], default: [] },
    topicProbabilities: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
