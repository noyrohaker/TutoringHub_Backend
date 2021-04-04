import { IStudent } from "../models/students.model";
import { StudentsDAL } from "../dal/studentsDAL";

export class StudentsBL {
  private studentsDataAccess: StudentsDAL;

  constructor() {
    this.studentsDataAccess = new StudentsDAL();
  }

  async create(document: IStudent) {
    return await this.studentsDataAccess.create(document);
  }

  async findById(id: string) {
    return await this.studentsDataAccess.findById(id);
  }

  async findByName(name: string) {
    return await this.studentsDataAccess.findByName(name);
  }

  async findAll(): Promise<Array<IStudent>> {
    return await this.studentsDataAccess.findAll();
  }

  async update(document: IStudent) {
    await this.studentsDataAccess.update(document);
  }
}
