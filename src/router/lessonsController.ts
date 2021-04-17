import { Router } from "express";
import { IController } from "../shared/IController";
import { LessonsBL } from "../bl/lessonsBL";
import { ILesson } from "../models/lessons.model";

export class LessonsController implements IController {
  path = "/lessons";
  router = Router();
  private lessonBl: LessonsBL;

  constructor() {
    this.lessonBl = new LessonsBL();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", async (req, res) => {
      const lessons = await this.lessonBl.findAll();

      res.send(lessons);
    });

    this.router.post("/", async (req, res) => {
      const lesson: ILesson = req.body;
      this.lessonBl.create(lesson);
      res.sendStatus(200);
    });

    this.router.post("/search", async (req, res) => {
      const lesson: ILesson = req.body;
      const lessons = await this.lessonBl.searchByParams(
        lesson.subject,
        lesson.classType,
        lesson.minAgeRange,
        lesson.maxAgeRange,
        lesson.city
      );
      res.send(lessons);
    });

    this.router.get("/subject", async (req, res) => {
      const lessons = await this.lessonBl.findBySubject(req.params.subject);
      res.send(lessons);
    });

    // this.router.get("/search", async (req, res) => {
    //   const lessons = await this.lessonBl.searchByParams(
    //     req.params.subject,
    //     parseInt(req.params.classType),
    //     parseInt(req.params.minAgeRange),
    //     parseInt(req.params.maxAgeRange),
    //     req.params.city
    //   );
    //   res.send(lessons);
    // });

    this.router.get("/teacherId/:teacherId", async (req, res) => {
      const lessons = await this.lessonBl.findByTeacherId(req.params.teacherId);
      res.send(lessons);
    });

    this.router.get("/:id", async (req, res) => {
      const lessons = await this.lessonBl.findById(req.params.id);
      res.send(lessons);
    });

    this.router.put("/", async (req, res) => {
      const lesson: ILesson = req.body;
      this.lessonBl.update(lesson);
      res.sendStatus(200);
    });

    this.router.get("/statistics/:id", async (req, res) => {
      let result = await this.lessonBl.mapReduce(req.params.id);
      res.send(result);
    });

    this.router.delete("/:id", async (req, res) => {
      this.lessonBl.delete(req.params.id);
      res.sendStatus(200);
    });
  }
}
