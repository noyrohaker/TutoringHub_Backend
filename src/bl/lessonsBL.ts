import { ILesson } from "../models/lessons.model";
import { LessonsDAL } from "../dal/lessonsDAL";

export class LessonsBL {
  private lessonDataAccess: LessonsDAL;

  constructor() {
    this.lessonDataAccess = new LessonsDAL();
  }

  async create(document: ILesson) {
    return await this.lessonDataAccess.create(document);
  }

  async findById(id: string) {
    return await this.lessonDataAccess.findById(id);
  }

  async findByName(name: string) {
    return await this.lessonDataAccess.findByName(name);
  }

  async findAll(): Promise<Array<ILesson>> {
    return await this.lessonDataAccess.findAll();
  }

  async update(document: ILesson) {
    await this.lessonDataAccess.update(document);
  }
}
