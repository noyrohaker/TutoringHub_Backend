import { LessonsController } from "./router/lessonsController";
import { StudentsController } from "./router/studentsController";
import { TeachersController } from "./router/teachersController";
import { App } from "./app";
import { config } from "dotenv";

import { Server } from "socket.io";
import * as http from "http";

var ConnectedUsers: string[] = [];
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
  ConnectedUsers.push(socket);

  console.log(`Client connected [id=${socket.id}]`);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => io.sockets.emit("FromAPI", ConnectedUsers.length), 1000);
  io.sockets.on("disconnect", () => {
    console.log(`Client disconnected [id=${socket.id}]`);
    ConnectedUsers = ConnectedUsers.filter((connectedUser) => {
      connectedUser != socket.id;
    });
    clearInterval(interval);
  });
});

app.listen(server);

// app.listen();
