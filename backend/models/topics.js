const mongoose = require("mongoose");
const lessonBodySchema = new mongoose.Schema({
  lessonSection: { type: [String], default: [] },
  sectionImgURL: { type: [String], default: [] },
});

const lessonSchema = new mongoose.Schema({
  lessonTitle: { type: String, required: true },
  lessonBody: { type: lessonBodySchema, default: {} },
});

const topicLessonSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  lessons: { type: [lessonSchema], required: true },
});

const topicsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  sourceKey: { type: String, required: true, unique: true },
  topics: { type: Array, required: true },
  topicKeys: { type: Array, required: false },
  topicLesson: { type: [topicLessonSchema], required: true },
});

const topicsModel = mongoose.model("topics", topicsSchema);
module.exports = topicsModel;
