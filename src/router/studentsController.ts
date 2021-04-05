import { Router } from "express";
import { IController } from "../shared/IController";
import { StudentsBL } from "../bl/studentsBL";
import { IStudent } from "../models/students.model";

export class StudentsController implements IController {
  path = "/students";
  router = Router();
  private studentBl: StudentsBL;

  constructor() {
    this.studentBl = new StudentsBL();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", async (req, res) => {
      const students = await this.studentBl.findAll();

      res.send(students);
    });

    this.router.post("/", async (req, res) => {
      const student: IStudent = req.body;
      this.studentBl.create(student);
      res.sendStatus(200);
    });

    this.router.get("/name", async (req, res) => {
      const students = await this.studentBl.findByName(req.params.name);
      res.send(students);
    });

    this.router.get("/:id", async (req, res) => {
      const students = await this.studentBl.findById(req.params.id);
      res.send(students);
    });

    this.router.put("/", async (req, res) => {
      const student: IStudent = req.body;
      this.studentBl.update(student);
      res.sendStatus(200);
    });
  }
}
