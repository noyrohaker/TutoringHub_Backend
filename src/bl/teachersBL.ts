import { ITeacher } from "../models/teachers.model";
import { TeachersDAL } from "../dal/teachersDAL";

export class TeachersBL {
  private teachersDataAccess: TeachersDAL;

  constructor() {
    this.teachersDataAccess = new TeachersDAL();
  }

  async create(document: ITeacher) {
    return await this.teachersDataAccess.create(document);
  }

  async findById(id: string) {
    return await this.teachersDataAccess.findById(id);
  }

  async findByName(name: string) {
    return await this.teachersDataAccess.findByName(name);
  }

  async findAll(): Promise<Array<ITeacher>> {
    return await this.teachersDataAccess.findAll();
  }

  async update(document: ITeacher) {
    await this.teachersDataAccess.update(document);
  }
}
