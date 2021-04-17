import { Router } from "express";
import { IController } from "../shared/IController";
import { TeachersBL } from "../bl/teachersBL";
import { ITeacher } from "../models/teachers.model";

export class TeachersController implements IController {
  path = "/teachers";
  router = Router();
  private teacherBL: TeachersBL;

  constructor() {
    this.teacherBL = new TeachersBL();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", async (req, res) => {
      const teachers = await this.teacherBL.findAll();

      res.send(teachers);
    });

    this.router.post("/", async (req, res) => {
      const teacher: ITeacher = req.body;
      const createdTeacher = await this.teacherBL.create(teacher);
      res.send(createdTeacher).status(200);
    });

    this.router.get("/:id", async (req, res) => {
      const teachers = await this.teacherBL.findById(req.params.id);
      res.send(teachers);
    });

    this.router.post("/search", async (req, res) => {
      const teacher: ITeacher = req.body;
      const teachers = await this.teacherBL.searchByParams(
        teacher.name,
        teacher.gender,
        teacher.education,
        teacher.score
      );
      res.send(teachers);
    });

    this.router.get("/getTeacherById/:id", async (req, res) => {
      const teachers = await this.teacherBL.findByLessonId("tutoringSubjects", req.params.id);
      res.send(teachers);
    });

    this.router.get("/firebaseId/:firebaseId", async (req, res) => {
      const teachers = await this.teacherBL.findByFirebaseId(req.params.firebaseId);
      res.send(teachers);
    });

    this.router.put("/", async (req, res) => {
      const teacher: ITeacher = req.body;
      teacher._id = teacher.id;

      this.teacherBL.update(teacher);
      res.status(200).send(teacher);
    });
  }
}
