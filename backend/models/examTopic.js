const mongoose = require("mongoose");

const examTopicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },

  topicProbabilities: {
    type: Double,
    default: -1,
  },
});

module.exports = examTopicSchema;
