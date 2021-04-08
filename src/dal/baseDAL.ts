import { Document, Model, ModelMapReduceOption, Types } from "mongoose";
import { emit } from "process";

export interface IBaseDataAccess {}

export class BaseDataAccess<T extends Document> implements IBaseDataAccess {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(document: T) {
    this.model.create(document);
  }

  public async findById(id: String) {
    return await this.model.findById(id);
  }

  public async findAll() {
    return this.model.find();
  }

  public async delete(id: String) {
    return await this.model.deleteOne(id);
  }

  public async update(document: T) {
    return await this.model.updateOne({ _id: document._id }, document);
  }

  public async filter(filter: any) {
    return await this.model.find(filter);
  }

  public async mapReduce(lessons: any) {
    var query = {
      _id: {
        $in: lessons._doc.tutoringSubjects,
      },
    };

    const x: ModelMapReduceOption<any, any, any> = {
      map: function () {
        emit(this.classType, this.students);
      },
      reduce: function (keyCustId, students) {
        return students.length;
      },
      query: query,
      // out: { inline: 1 },
      // out: { replace: "map_reduce" },
      verbose: true,
    };
    await this.model.mapReduce(x, (err, res) => {
      console.log(err);
      console.log(res);
    });
    // return await this.model.mapReduce(x, (err, res) => {
    //   debugger;
    // });
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
