import { Document, Schema, model, SchemaDefinition, Model } from "mongoose";

export interface ILesson extends Document {
    _id: string;
    subject: string;
    city?: string;
    minAgeRange?: number;
    maxAgeRange?: number;
    classType?: string;
}

export type ILessonSchema = ILesson & SchemaDefinition;
export interface ILessonModel extends ILesson {}

export const lessonSchema = new Schema<ILessonSchema>(
  {
    subject: String,
    city: String,
    minAgeRange: Number,
    maxAgeRange: Number,
    classType: String
  },
  { versionKey: false }
);

export const Lesson: Model<ILessonModel> = model<ILessonModel>(
  "Lesson",
  lessonSchema,
  "lessons"
);
