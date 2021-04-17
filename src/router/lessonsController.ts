import { Router } from "express";
import { IController } from "../shared/IController";
import { LessonsBL } from "../bl/lessonsBL";
import { ILesson } from "../models/lessons.model";
import { TeachersBL } from "../bl/teachersBL";

export class LessonsController implements IController {
  path = "/lessons";
  router = Router();
  private lessonBl: LessonsBL;
  private teacherBL: TeachersBL;

  constructor() {
    this.lessonBl = new LessonsBL();
    this.teacherBL = new TeachersBL();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get("/", async (req, res) => {
      const lessons = await this.lessonBl.findAll();

      res.send(lessons);
    });

    this.router.post("/", async (req, res) => {
      const lesson: ILesson = req.body;
      if(lesson.teacherId) {
        const createdLesson = await this.lessonBl.create(lesson);
        if(createdLesson) {
          const teacherClassOwner = await this.teacherBL.findById(lesson.teacherId);
          if(teacherClassOwner) {
            if(teacherClassOwner.tutoringSubjects) {
              let updatedTutoringSubjects = teacherClassOwner.tutoringSubjects;
              updatedTutoringSubjects.push(createdLesson._id);
              teacherClassOwner.tutoringSubjects = updatedTutoringSubjects;
            } else {
              teacherClassOwner.tutoringSubjects = [createdLesson._id];
            }
            this.teacherBL.update(teacherClassOwner);
            res.status(200).send(createdLesson);
          }
        }
      }
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
      await this.lessonBl.update(lesson);
      res.status(200).send(lesson);
    });

    this.router.get("/statistics/:id", async (req, res) => {
      let result = await this.lessonBl.mapReduce(req.params.id);
      res.send(result);
    });

    this.router.get("/cityStatistics/:id", async (req, res) => {
      const match = { teacherId: req.params.id };
      const group = { _id: "$city", count: { $sum: 1 } };
      const sort =  { count: -1 };
      let result = await this.lessonBl.groupBy(match, group, sort);
      res.send(result);
    });

    this.router.delete("/:id", async (req, res) => {
      const lessonToDelete = await this.lessonBl.findById(req.params.id);
      if(lessonToDelete) {
        const teacherClassOwner = await this.teacherBL.findById(lessonToDelete.teacherId);
        if(teacherClassOwner && teacherClassOwner.tutoringSubjects) {
          let updatedTutoringSubjects = teacherClassOwner.tutoringSubjects.filter((tutoringSubject) => tutoringSubject.toString() !== lessonToDelete._id.toString());
          teacherClassOwner.tutoringSubjects = updatedTutoringSubjects;
          await this.teacherBL.update(teacherClassOwner);
        }
        await this.lessonBl.delete(req.params.id);
        res.sendStatus(200);
      }
    });
  }
}
