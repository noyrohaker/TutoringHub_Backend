import { Document, Schema, model, SchemaDefinition, Model } from "mongoose";

export enum Gender {
  Male = 0,
  Female = 1,
}

export enum Score {
  score_0 = 0,
  score_1 = 1,
  score_2 = 2,
  score_3 = 3,
  score_4 = 4,
  score_5 = 5,
}

export enum Area {
  south = 0,
  north = 1,
  central = 2,
}

export interface ITeacher extends Document {
  _id: string;
  name: string;
  gender: Gender;
  phone: number;
  education: string;
  tutoringSubjects: Array<string>;
  tutoringAreas: Array<Area>;
  score: Score;
  profilePicture: string;
  lessons: Array<Number>;
}

export type ITeacherSchema = ITeacher & SchemaDefinition;
export interface ITeacherModel extends ITeacher {}

export const teacherSchema = new Schema<ITeacherSchema>(
  {
    name: String,
    gender: Number,
    phone: Number,
    education: String,
    tutoringSubjects: [
      {
        type: String,
      },
    ],
    tutoringAreas: [
      {
        type: Number,
      },
    ],
    score: Number,
    profilePicture: String,
    lessons: [
      {
        type: Number,
      },
    ],
  },

  { versionKey: false }
);

export const Teacher: Model<ITeacherModel> = model<ITeacherModel>(
  "Teacher",
  teacherSchema,
  "Teachers"
);
