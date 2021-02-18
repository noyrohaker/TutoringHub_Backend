import { UsersController } from "./router/usersController";
import { App } from "./app";
import { config } from "dotenv";
import { Server } from "socket.io";
import * as http from "http";

var ConnectedUsers: string[] = [];
let interval;

config();

const app = new App([new UsersController()], 5001);

let server: http.Server = http.createServer(app.app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//Manage sockets for send data to client
io.sockets.on("connection", (socket) => {
  //Token to json
  // var tokenData = jwt_decode(socket.handshake.headers.authorization);
  // const userId = UserUtil.getUserId(tokenData);

  //Add the user to his own room
  // socket.join(userId);
  ConnectedUsers.push(socket);

  console.log(`Client connected [id=${socket.id}]`);

  if (interval) {
    clearInterval(interval);
  }
  //600000 is 10 minutes
  interval = setInterval(() => io.sockets.emit("FromAPI", ConnectedUsers.length), 10000);
  io.sockets.on("disconnect", () => {
    console.log(`Client disconnected [id=${socket.id}]`);
    clearInterval(interval);
  });
});

app.listen(server);
