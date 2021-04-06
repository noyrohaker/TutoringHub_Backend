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
