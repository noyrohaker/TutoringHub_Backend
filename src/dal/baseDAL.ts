import { Document, Model, ModelMapReduceOption, Types } from "mongoose";
import { emit } from "process";
import { Lesson } from "../models/lessons.model";
import { Teacher } from "../models/teachers.model";

export interface IBaseDataAccess { }

export class BaseDataAccess<T extends Document> implements IBaseDataAccess {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(document: T) {
    return await this.model.create(document);
  }

  public async findById(id: String) {
    return await this.model.findById(id);
  }

  public async findAll() {
    return this.model.find();
  }

  public async delete(id: String) {
    return await this.model.deleteOne({ _id: id });
  }

  public async update(document: T) {
    return await this.model.updateOne({ _id: document._id }, document);
  }

  public async deleteItemFromArray(id: string, updateParams: any) {
    return await this.model.updateOne({ firebaseId: id }, updateParams);
  }

  public async filter(filter: any) {
    return await this.model.find(filter);
  }

  public async mapReduce(teacherId) {

    let teacherData = await Teacher.findById(teacherId);
    let o: any = {};
    o.map = "function () {emit(this.classType, this.subject)}";
    o.reduce = function (k, vals) {
      return vals.length;
    };
    o.out = { inline:1 };
    o.query = {
      _id: {
        $in: teacherData.tutoringSubjects,
      },
    };
    return this.model.mapReduce(o);
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
