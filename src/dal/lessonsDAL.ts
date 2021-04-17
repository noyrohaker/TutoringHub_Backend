import { BaseDataAccess } from "./baseDAL";
import { ILessonModel, Lesson, ILesson } from "../models/lessons.model";
import { TeachersDAL } from "./teachersDAL";
import { ITeacherModel } from "../models/teachers.model";

export class LessonsDAL {
  private lessonDataAccess: BaseDataAccess<ILessonModel>;
  private teachersDataAccess: TeachersDAL;

  constructor() {
    this.lessonDataAccess = new BaseDataAccess(Lesson);
    this.teachersDataAccess = new TeachersDAL();
  }

  async create(lesson: ILesson) {
    return await this.lessonDataAccess.create(<ILessonModel>lesson);
  }

  async findById(id: string) {
    return await this.lessonDataAccess.findById(id);
  }

  async findByTeacherId(teacherId: string) {
    return await this.lessonDataAccess.filter({ teacherId: teacherId });
  }

  async findAll() {
    return await this.lessonDataAccess.findAll();
  }

  async update(lesson: ILesson) {
    this.lessonDataAccess.update(lesson);
  }

  async findBySubject(subject: String) {
    return await this.lessonDataAccess.filter({ subject: subject });
  }

  async mapReduce(teacherId) {
    return await this.lessonDataAccess.mapReduce(teacherId);
  }

  async delete(id: String) {
    return await this.lessonDataAccess.delete(id);
  }

  async groupBy(match: any, group: any, sort: any) {
    return await this.lessonDataAccess.groupBy(match, group, sort);
  }
}
