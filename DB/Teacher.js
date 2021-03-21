const mongoose = require("mongoose");

const teacher = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  gender: {
    type: Number,
  },
  birthYear: {
    type: Number,
  },
  addressCity: {
    type: String,
  },
  academy: {
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
  teachingCities: {
    type: String,
  },
  teacherDesc: {
    type: String,
  },
  lessons: {
    type: [Number],
  },
});

module.exports = Teacher = mongoose.model("teacher", teacher);
