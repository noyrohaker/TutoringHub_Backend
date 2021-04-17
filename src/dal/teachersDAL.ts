import { BaseDataAccess } from "./baseDAL";
import { ITeacherModel, Teacher, ITeacher, Area, Gender, Score } from "../models/teachers.model";

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


  async searchByParams(
    name: string,
    gender: Gender,
    education: String,
    score: Score
  ) {
    var query = {} as Document;
    if (score !== NaN && score != null) {
      query["score"] = {  $gte: gender.valueOf() };
    }
    if (gender != NaN && gender != null) {
      query["gender"] = { $gte: gender.valueOf() };
    }
    if (name) {
      query["name"] = { $regex: name, $options: "$i" };
    }
    if (education) {
      query["education"] = { $regex: education, $options: "$i" };
    }

    return await this.teacherDataAccess.searchByParams(query, name);
  }

}
