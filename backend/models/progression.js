const mongoose = require("mongoose");
const progressionSchema = new mongoose.Schema(
  {
    marks: {
      type: [Number],
      default: [],
    },

    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const progressionModel = mongoose.model("progression", progressionSchema);
module.exports = progressionModel;
