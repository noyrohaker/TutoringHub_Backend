const express = require("express");
const connectDB = require("./DB/Connection");
const app = express();

connectDB();
app.use(express.json({ extended: false }));
app.use("/api/studentModel", require("./Api/Student"));
app.use("/api/lessonModel", require("./Api/Lesson"));
app.use("/api/teacherModel", require("./Api/Teacher"));

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Server started..."));
