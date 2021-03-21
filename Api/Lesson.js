const express = require("express");
const mongoose = require("mongoose");

const Lesson = require("../DB/Lesson");
const route = express.Router();

route.post("/", async (req, res) => {
  const { prof, teacherInfo, studentInfo } = req.body;

  let lesson = {};
  lesson.id = id;
  lesson.prof = prof;
  // lesson.teacherInfo = teacherInfo;
  // lesson.studentInfo = studentInfo;

  let lessonModel = new Lesson(lesson);
  await lessonModel.save();
  res.json(lessonModel);
});

module.exports = route;
