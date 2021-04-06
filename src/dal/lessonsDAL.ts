import { BaseDataAccess } from "./baseDAL";
import { ILessonModel, Lesson, ILesson } from "../models/lessons.model";

export class LessonsDAL {
  private lessonDataAccess: BaseDataAccess<ILessonModel>;

  constructor() {
    this.lessonDataAccess = new BaseDataAccess(Lesson);
  }

  async create(lesson: ILesson) {
    this.lessonDataAccess.create(<ILessonModel>lesson);
  }

  async findById(id: string) {
    return await this.lessonDataAccess.findById(id);
  }

  async findAll() {
    return await this.lessonDataAccess.findAll();
  }

  async update(lesson: ILesson) {
    this.lessonDataAccess.update(lesson);
  }

  async findByName(name: String) {
    return await this.lessonDataAccess.filter({ name: name });
  }
}
