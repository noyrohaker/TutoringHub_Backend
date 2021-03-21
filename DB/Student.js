const mongoose = require("mongoose");

const student = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
  },
  gender: {
    type: Number,
  },
  birthYear: {
    type: Number,
  },
  city: {
    type: String,
  },
  status: {
    type: String,
  },
  age: {
    type: Number,
  },
  phoneNum: {
    type: String,
  },
  wantedProf: {
    type: String,
  },
  lessonsNumEval: {
    type: Number,
  },
  lessons: {
    type: [Number],
  },
});

module.exports = Student = mongoose.model("student", student);
