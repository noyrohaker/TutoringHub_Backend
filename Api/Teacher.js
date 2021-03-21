const express = require("express");
const mongoose = require("mongoose");

const Teacher = require("../DB/Teacher");
const route = express.Router();

route.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    mail,
    profilePic,
    gender,
    birthYear,
    addressCity,
    academy,
    age,
    phoneNum,
    wantedProf,
    teachingCities,
    teacherDesc,
    lessons,
  } = req.body;

  let teacher = {};
  teacher.firstName = firstName;
  teacher.lastName = lastName;
  teacher.mail = mail;
  teacher.profilePic = profilePic;
  teacher.gender = gender;
  teacher.birthYear = birthYear;
  teacher.addressCity = addressCity;
  teacher.academy = academy;
  teacher.age = age;
  teacher.phoneNum = phoneNum;
  teacher.wantedProf = wantedProf;
  teacher.teachingCities = teachingCities;
  teacher.teacherDesc = teacherDesc;
  teacher.lessons = lessons;

  let teacherModel = new Teacher(teacher);
  await teacherModel.save();
  res.json(teacherModel);
});

module.exports = route;
