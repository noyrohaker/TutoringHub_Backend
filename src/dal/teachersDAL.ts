import { BaseDataAccess } from "./baseDAL";
import { ITeacherModel, Teacher, ITeacher } from "../models/teachers.model";

export class TeachersDAL {
  private teacherDataAccess: BaseDataAccess<ITeacherModel>;

  constructor() {
    this.teacherDataAccess = new BaseDataAccess(Teacher);
  }

  async create(teacher: ITeacher) {
    this.teacherDataAccess.create(<ITeacherModel>teacher);
  }

  async findById(id: string) {
    return await this.teacherDataAccess.findById(id);
  }

  async findAll() {
    return await this.teacherDataAccess.findAll();
  }

  async update(teacher: ITeacher) {
    this.teacherDataAccess.update(teacher);
  }

  async findByName(name: String) {
    return await this.teacherDataAccess.filter({ name: name });
  }
}
