import * as express from "express";
import { IController } from "../shared/IController";
import { UsersBL } from "../bl/usersBL";
import { IUser } from "../models/user.model";

// // middleware that is specific to this router
// router.use((req, res, next)=> {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route

export class UsersController implements IController {
  path = "/users";
  router = express.Router();
  private usersBl: UsersBL;
  static counter = 0;

  constructor() {
    this.usersBl = new UsersBL();
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get("/", async (req, res) => {
      const users = await this.usersBl.findAll();
      console.log(UsersController.counter++);
      res.send(users);
    });

    this.router.post("/", async (req, res) => {
      const user: IUser = req.body;
      this.usersBl.create(user);
      res.sendStatus(200);
    });

    this.router.get("/name", async (req, res) => {
      const users = await this.usersBl.findByName(req.params.name);
      res.send(users);
    });

    this.router.get("yossi", async (req, res) => {
      const users = await this.usersBl.findByName(req.params.name);
      res.send(users);
    });

    this.router.get("/:id", async (req, res) => {
      const user = await this.usersBl.findById(req.params.id);
      res.send(user);
    });

    this.router.put("/", async (req, res) => {
      const user: IUser = req.body;
      this.usersBl.update(user);
      res.sendStatus(200);
    });
  }
}
