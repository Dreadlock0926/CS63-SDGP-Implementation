const mongoose = require("mongoose");
const forumSchema = mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      default: "",
    },
    topic: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    by: {
      type: String,
      ref: "users", //referencing to the users collection to make a connection!
    },
  },

  { timestamps: true }
);
const forumModel = mongoose.model("forums", forumSchema);
module.exports = forumModel;
