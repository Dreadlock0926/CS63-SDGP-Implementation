const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    voxelPoints: {type: Number, default: 0},
    courses: {type: Array},
    completedCourses: {type: Array},
    topicProbabilities: {type: Object},
    correctQuestions: {type: Array},
    wrongQuestions: {type: Array},
    feedbackExams: {type: Array}
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;