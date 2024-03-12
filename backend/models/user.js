const examTopicSchema = require("./examTopic");
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
  photo:{
    type:String,
    default:"https://static-00.iconduck.com/assets.00/person-icon-476x512-hr6biidg.png"
  },
    marks: {
      type: Number,
      default: 0,
    },
    nerdPoints:{
      type:Number,
      min:0,
      default:0
    },
    by: {
      type: String,
      ref: "users",
    },
  
},{timestamps:true});

const examHistory = new mongoose.Schema({
  examInfo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "exams",
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
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    voxelPoints: {type: Number, default: 0},
    courses: {type: Array},
    completedCourses: {type: Array},
    topicProbabilities: {type: Object},
    correctQuestions: {type: Array},
    wrongQuestions: {type: Array},
    feedbackExams: {type: Array}
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
