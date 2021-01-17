import { UsersController } from "./router/usersController";
import { App } from "./app";
import { config } from "dotenv";

config();

const app = new App([new UsersController()], 5001);

app.listen();
