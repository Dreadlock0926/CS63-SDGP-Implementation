const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  voxelPoints: {
    type: Number,
    default: 0
  },
  courses: [{
    type: String,
    enum: ['p1', 's1'] // Assuming these are the possible course codes
  }],
  completedCourses: [{
    type: String
  }],
  correctQuestions: [{
    type: String
  }],
  wrongQuestions: [{
    type: String
  }],
  feedbackExams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam' // Assuming Exam is another schema/model
  }],
  topicalExams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam' // Assuming Exam is another schema/model
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  topicProbabilities: {
    p1: {
      q: Number,
      f: Number,
      cg: Number,
      cm: Number,
      t: Number,
      s: Number,
      d: Number,
      i: Number
    },
    s1: {
      rod: Number,
      pac: Number,
      p: Number,
      drv: Number,
      tnd: Number
    }
  },
  lessons: {
    integration: {
      integrationArea: Boolean,
      integrationByParts: Boolean,
      substitutionIntegration: Boolean
    }
  },
  learning: [String] // Assuming this should be an array of strings
});

module.exports = mongoose.model('users', userSchema);
