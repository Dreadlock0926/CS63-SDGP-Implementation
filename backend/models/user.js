const mongoose = require("mongoose");

const topicProbabilities = new mongoose.Schema(
    {
      source: {type: String, required: true}
    }
)

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
    feedbackExams: {type: Array},
    topicalExams: {type: Array}
    // progress: {
    //   type: progressionSchema,
    //   default: {},
    // },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
