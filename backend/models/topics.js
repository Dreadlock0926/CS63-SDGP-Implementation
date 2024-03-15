const mongoose = require("mongoose");
const topicsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  sourceKey: { type: String, required: true, unique: true },
  topics: { type: Array, required: true },
  learnedProgress: {
    type: Array,
    default: [],
    percentage: { type: [Number], default: [] },
    url: { type: String, default: "" },
  },
  tested: {
    type: Array,
    default: [],
    state: {
      type: Boolean,
      default: false,
    },
    testedExams: {
      type: Array,
      default: [],
    },
  },
  topicKeys: { type: Array, required: false },
});

const topicsModel = mongoose.model("topics", topicsSchema);
module.exports = topicsModel;
