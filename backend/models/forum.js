const mongoose = require("mongoose");
const forumAnswerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    by: {
      type: mongoose.Schema.ObjectId,
      ref: "users", //referencing to the users collection to make a connection!
    },
  },
  { timestamps: true }
);

const forumQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: [forumAnswerSchema],
      default: [],

    },  

    description: {
      type: String,
      trim: true,
    },
    answers: {
      type:Array,
      default: [],
      index: {
        type: Object,
        default: {},
        text: {
          type: String,
        },
        answeredBy: {
          type: String,
        },
        noOfUpvotes: {
          type: Number,
          default: 0,
        },
      },
    },

    topic: {
      type: String,
      default: "",
    },
    rating: { type: Number, default: 0, min: 0 },
    by: {
      type: String,
      ref: "users", //referencing to the users collection to make a connection!
    },
  },

  { timestamps: true }

);
const forumQuestionModel = mongoose.model("forums", forumQuestionSchema);
const forumAnswerModel = mongoose.model("forumsAnswers", forumAnswerSchema);

module.exports = forumQuestionModel;
module.exports = forumAnswerModel;
