import { Document, Schema, model, SchemaDefinition, Model } from "mongoose";

export enum Gender {
  Male = 0,
  Female = 1,
}

export interface IStudent extends Document {
  id: string;
  firebaseId: string;
  firstName: string;
  lastName: string;
  mail: string;
  gender: Gender;
  age: number;
  phone: number;
  lessons: Array<string>;
}

export type IStudentSchema = IStudent & SchemaDefinition;
export interface IStudentModel extends IStudent {}

export const studentSchema = new Schema<IStudentSchema>(
  {
    id: String,
    firebaseId: String,
    firstName: String,
    lastName: String,
    mail: String,
    gender: Number,
    age: Number,
    phone: String,
    lessons: [String],
  },
  { versionKey: false }
);

export const Student: Model<IStudentModel> = model<IStudentModel>(
  "Student",
  studentSchema,
  "students"
);
