import { Document, Model, Types } from "mongoose";

export interface IBaseDataAccess { }

export class BaseDataAccess<T extends Document> implements IBaseDataAccess {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(document: T) {
    this.model.create(document);
  }

  public async findById(id: string) {
    return await this.model.findById(id);
  }

  public async findAll() {
    return this.model.find();
  }

  public async delete(id: string) {
    return await this.model.deleteOne(id);
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

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
