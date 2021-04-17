import { BaseDataAccess } from "./baseDAL";
import {
  ILessonModel,
  Lesson,
  ILesson,
  ClassType,
} from "../models/lessons.model";
import { TeachersDAL } from "./teachersDAL";
import { ITeacherModel } from "../models/teachers.model";
import { Document } from "mongoose";

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
    return await this.lessonDataAccess.update(lesson);
  }

  async findBySubject(subject: String) {
    return await this.lessonDataAccess.filter({ subject: subject });
  }

  async searchByParams(
    subject: string,
    classType: ClassType,
    minAgeRange: Number,
    maxAgeRange: Number,
    city: string
  ) {
    var query = {} as Document;

    if (classType !== NaN) {
      query["classType"] = classType;
    }

    if (city) {
      query["city"] = city;
    }

    if (minAgeRange !== NaN) {
      query["minAgeRange"] = { $gte: minAgeRange };
    }

    if (maxAgeRange !== NaN) {
      query["maxAgeRange"] = { $lte: maxAgeRange };
    }

    if (subject) {
      query["subject"] = { $regex: subject, $options: "$i" };
    }

    return await this.lessonDataAccess.searchByParams(query, subject);
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
