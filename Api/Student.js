const express = require("express");
const mongoose = require("mongoose");

const Student = require("../DB/Student");
const route = express.Router();

route.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    mail,
    gender,
    birthYear,
    city,
    status,
    age,
    phoneNum,
    wantedProf,
    lessonsNumEval,
    lessons,
  } = req.body;

  let student = {};
  student.firstName = firstName;
  student.lastName = lastName;
  student.mail = mail;
  student.gender = gender;
  student.birthYear = birthYear;
  student.city = city;
  student.status = status;
  student.age = age;
  student.phoneNum = phoneNum;
  student.wantedProf = wantedProf;
  student.lessonsNumEval = lessonsNumEval;
  student.lessons = lessons;

  let studentModel = new Student(student);
  await studentModel.save();
  res.json(Student);
});

module.exports = route;
