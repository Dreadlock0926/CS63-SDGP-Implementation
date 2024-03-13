const mongoose = require("mongoose");

const learningResourcesSchema = new mongoose.Schema(
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

const learningModel = mongoose.model("resources", learningResourcesSchema);

module.exports = learningModel;
