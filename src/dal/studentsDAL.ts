import { BaseDataAccess } from "./baseDAL";
import { IStudentModel, Student, IStudent } from "../models/students.model";

export class StudentsDAL {
  private studentDataAccess: BaseDataAccess<IStudentModel>;

  constructor() {
    this.studentDataAccess = new BaseDataAccess(Student);
  }

  async deleteUserClassById(studentId: string, lessonId: string) {
    return await this.studentDataAccess.deleteItemFromArray(studentId, { $pull: { lessons: lessonId } });
  }

  async create(student: IStudent) {
    this.studentDataAccess.create(<IStudentModel>student);
  }

  async findById(id: string) {
    return await this.studentDataAccess.filter({ firebaseId: id });
  }

  async findAll() {
    return await this.studentDataAccess.findAll();
  }

  async update(student: IStudent) {
    this.studentDataAccess.update(student);
  }

  async findByName(name: String) {
    return await this.studentDataAccess.filter({ name: name });
  }
}
