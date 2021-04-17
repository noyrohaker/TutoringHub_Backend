import { ILesson } from "../models/lessons.model";
import { LessonsDAL } from "../dal/lessonsDAL";
import { ITeacherModel, ITeacher } from "../models/teachers.model";
import { TeachersDAL } from "../dal/teachersDAL";
import { TeachersBL } from "./teachersBL";

export class LessonsBL {
  private lessonDataAccess: LessonsDAL;
  teachersBL: TeachersBL;

  constructor() {
    this.lessonDataAccess = new LessonsDAL();
  }

  async create(document: ILesson) {
    return await this.lessonDataAccess.create(document);
  }

  async findById(id: string) {
    return await this.lessonDataAccess.findById(id);
  }

  async findByTeacherId(teacherId: string) {
    return await this.lessonDataAccess.findByTeacherId(teacherId);
  }

  async findBySubject(subject: string) {
    return await this.lessonDataAccess.findBySubject(subject);
  }

  async findAll(): Promise<Array<ILesson>> {
    return await this.lessonDataAccess.findAll();
  }

  async update(document: ILesson) {
    await this.lessonDataAccess.update(document);
  }

  async delete(id: String) {
    await this.lessonDataAccess.delete(id);
  }

  async mapReduce(teacherId?: string) {
   return await this.lessonDataAccess.mapReduce(teacherId);
  }

  async groupBy(match: any, group: any, sort: any) {
    return await this.lessonDataAccess.groupBy(match, group, sort);
   }
}
