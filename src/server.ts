// const express = require("express");
// const connectDB = require("./DB/Connection");
// const app = express();

// connectDB();
// app.use(express.json({ extended: false }));
// app.use("/api/studentModel", require("./Api/Student"));
// app.use("/api/lessonModel", require("./Api/Lesson"));
// app.use("/api/teacherModel", require("./Api/Teacher"));

// const Port = process.env.Port || 3000;

// app.listen(Port, () => console.log("Server started..."));

import { LessonsController } from "./router/lessonsController";
import { StudentsController } from "./router/studentsController";
import { TeachersController } from "./router/teachersController";
import { App } from "./app";
import { config } from "dotenv";

config();

const app = new App(
  [new LessonsController(), new StudentsController(), new TeachersController()],
  5001
);

app.listen();
