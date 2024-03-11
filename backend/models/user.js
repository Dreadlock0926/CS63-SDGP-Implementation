const examTopicSchema = require("./topics");
const mongoose = require("mongoose");

const topicProbabilitiesSchema = new mongoose.Schema({
  moduleType: {
    type: String,
    required: true,
  },
  topicProbabilities: {
    type: [examTopicSchema],
    default: [],
  },
});

const examHistory = new mongoose.Schema({
  examInfo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "resources",
    required: true,
  },

  userCorrectAnswers: {
    type: [String],
    default: [],
  },

  userWrongAnswers: {
    type: [String],
    default: [],
  },

  topicProbabilitiesForModules: {
    type: [topicProbabilitiesSchema],
    default: [],
  },
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },

  couseDescription: {
    type: String,
    default: "",
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
    type: examHistory,
    default: {},
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
    theTopics:{
      type:Array,
      default:[],
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;