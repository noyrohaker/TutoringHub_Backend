import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { IController } from "./shared/IController";
import { connect } from "mongoose";
import * as http from "http";

export class App {
  app: express.Application;
  port: number;
  router: express.Router;

  constructor(controllers: Array<IController>, port: number) {
    this.app = express();
    this.port = port;
    this.router = express.Router();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public async listen(server: http.Server) {
    try {
      await connect(process.env.connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("mongodb started.");
      server.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    } catch (e) {
      console.error(`an error accourd: ${e}`);
    }
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Array<IController>) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
}
