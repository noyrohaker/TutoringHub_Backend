const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const lesson = new mongoose.Schema({
  id: {
    type: Number,
  },

  prof: {
    type: String,
  },

  // teacherInfo: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
  // studentInfo: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  //   teacherInfo: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Teacher",
  //   },
  //   studentInfo: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Student",
  //   },
});

module.exports = Lesson = mongoose.model("lesson", lesson);
