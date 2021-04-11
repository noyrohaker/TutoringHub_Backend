import { Document, Schema, model, SchemaDefinition, Model } from "mongoose";

export enum ClassType {
  Frontal = 0,
  Teachers_Home = 1,
  Students_Home = 2,
}

export interface ILesson extends Document {
  _id: string;
  subject: string;
  city?: string;
  minAgeRange?: number;
  maxAgeRange?: number;
  classType?: ClassType;
  teacherId?: string;
  students?: Array<string>;
}

export type ILessonSchema = ILesson & SchemaDefinition;
export interface ILessonModel extends ILesson {}

export const lessonSchema = new Schema<ILessonSchema>(
  {
    subject: String,
    city: String,
    minAgeRange: Number,
    maxAgeRange: Number,
    classType: Number,
    teacherId: String,
    students: [
      {
        type: String,
      },
    ],
  },
  { versionKey: false }
);

export const Lesson: Model<ILessonModel> = model<ILessonModel>(
  "Lesson",
  lessonSchema,
  "lessons"
);
