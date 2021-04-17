import { ITeacher, Score, Gender, Area } from "../models/teachers.model";
import { TeachersDAL } from "../dal/teachersDAL";

export class TeachersBL {
  private teachersDataAccess: TeachersDAL;

  constructor() {
    this.teachersDataAccess = new TeachersDAL();
  }

  async findByLessonId(field: string, value: string) {
    return await this.teachersDataAccess.findByFieldValue(field, value);
  }

  async searchByParams(
    name: string,
    gender: Gender,
    education: String,
    score: Score
  ) {
    return await this.teachersDataAccess.searchByParams(
      name,
      gender,
      education,
      score
    );
  }

  async create(document: ITeacher) {
    return await this.teachersDataAccess.create(document);
  }

  async findById(id: string) {
    return await this.teachersDataAccess.findById(id);
  }

  async findByFirebaseId(firebaseId: string) {
    return await this.teachersDataAccess.findByFirebaseId(firebaseId);
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
