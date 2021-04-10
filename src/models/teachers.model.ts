import { ILesson } from './lessons.model';
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
  gender?: Gender;
  score?: Score;
  education?: string;
  tutoringSubjects?: Array<string>;
  availability?: boolean;
  areas?: Array<Area>;
  firebaseId?: string;
}

export type ITeacherSchema = ITeacher & SchemaDefinition;
export interface ITeacherModel extends ITeacher { }

export const teacherSchema = new Schema<ITeacherSchema>(
  {
    name: String,
    availability: String,
    education: String,
    tutoringSubjects: [
      {
        type: String,
      },
    ],
    areas: [
      {
        type: Number,
      },
    ],
    score: Number,
    firebaseId: String,
  },

  { versionKey: false }
);

export const Teacher: Model<ITeacherModel> = model<ITeacherModel>(
  "Teacher",
  teacherSchema,
  "teachers"
);
