import { BaseDataAccess } from "./baseDAL";
import { ITeacherModel, Teacher, ITeacher } from "../models/teachers.model";

export class TeachersDAL {
  private teacherDataAccess: BaseDataAccess<ITeacherModel>;

  constructor() {
    this.teacherDataAccess = new BaseDataAccess(Teacher);
  }

  async create(teacher: ITeacher) {
    return await this.teacherDataAccess.create(<ITeacherModel>teacher);
  }

  async findByFieldValue(field: string, value: string) {
    return await this.teacherDataAccess.filter({[field]: value});
  }

  async findById(id: String) {
    return await this.teacherDataAccess.findById(id);
  }

  async findByFirebaseId(firebaseId: string) {
    return await this.teacherDataAccess.filter({ firebaseId: firebaseId });
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
