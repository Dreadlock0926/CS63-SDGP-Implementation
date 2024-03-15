const mongoose = require("mongoose");

const userProgress = new mongoose.Schema({
  topicKey: { type: String, required: true },
  userCompleted: { type: Boolean, default: false },
  tested: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema({
  courseRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topics",
    required: true,
  },

  userProgress: {
    type: [userProgress],
    required: true,
  },

  courseKey: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    voxelPoints: { type: Number, default: 0 },
    courses: { type: [courseSchema], default: [] },
    completedCourses: { type: Array },
    topicProbabilities: { type: Object },
    correctQuestions: { type: Array },
    wrongQuestions: { type: Array },
    feedbackExams: { type: Array },
    topicalExams: { type: Array },
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
module.exports = userProgress;
