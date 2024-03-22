const mongoose = require("mongoose");
const forumAnswer = new mongoose.Schema(
  {
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
  { timestamps: true }
);

const forumSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    answers: {
      type: [forumAnswer],
      default: [],
    },

    topic: {
      type: String,
      required: true,
    },
    rating: { type: Number, default: 0 },
    by: {
      type: String,
      ref: "users", //referencing to the users collection to make a connection!
    },
  },

  { timestamps: true }
);
const forumModel = mongoose.model("forums", forumSchema);
module.exports = forumModel;
