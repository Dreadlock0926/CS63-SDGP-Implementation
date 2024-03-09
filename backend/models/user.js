const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examType: { type: String, required: true },

  examQuestions: { type: Array, required: true },

  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  userAnswers: {
    type: [String],
    default: [],
  },

  examModule: {
    type: String,
  },

  examTopic: {
    type: String,
  },

  mark: {
    type: Number,
  },
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },

  noOfLessons: {
    type: Number,
    default: 0,
  },

  userLearnedLessons: {
    type: Number,
    default: 0,
  },
});

const progressionSchema = new mongoose.Schema({
  marks: {
    type: Number,
    default: 0,
  },

  examHistory: {
    type: [examSchema],
    default: [],
  },

  voxalPoints: {
    type: Number,
    default: 0,
  },
  hoursLearned: {
    type: Number,
    defalut: 0,
  },
  ongoingCourses: {
    type: Number,
    default: 0,
  },
  completeCourse: {
    type: Number,
    default: 0,
  },

  courses: {
    type: [courseSchema],
    default: [],
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },

    progress: {
      type: progressionSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
