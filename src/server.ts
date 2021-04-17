import { LessonsController } from "./router/lessonsController";
import { StudentsController } from "./router/studentsController";
import { TeachersController } from "./router/teachersController";
import { App } from "./app";
import { config } from "dotenv";

import { Server } from "socket.io";
import * as http from "http";

var ConnectedUsers: number = 0;
let interval;

const app = new App([new LessonsController(), new StudentsController(), new TeachersController()], 5001);

config();

let server: http.Server = http.createServer(app.app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Manage sockets for send data to client
io.sockets.on("connection", (socket) => {
  ConnectedUsers++;
  console.log(`Client connected [id=${socket.id}]`);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => io.sockets.emit("FromAPI", ConnectedUsers), 1000);

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected [id=${socket.id}]`);
    clearInterval(interval);
  });
});

app.listen(server);
