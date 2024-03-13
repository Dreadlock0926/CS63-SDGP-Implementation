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
    lesson: { ObjectId: { type: String }, type: [Boolean], default: [] },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
