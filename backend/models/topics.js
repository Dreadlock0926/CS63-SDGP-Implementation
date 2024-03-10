const mongoose = require("mongoose");
const topicsSchema = new mongoose.Schema({

  source: { type: String, required: true},
  sourceKey: {type: String, required: true, unique: true},
  topics: {type: Array, required: true },
  topicKeys: {type: Array, required: false}

});

const topicsModel = mongoose.model("topics", topicsSchema);
module.exports = topicsModel;