import { Document, Schema, model, SchemaDefinition, Model } from "mongoose";

export interface ILesson extends Document {
  id: string;
  prof: string;
}

export type ILessonSchema = ILesson & SchemaDefinition;
export interface ILessonModel extends ILesson {}

export const lessonSchema = new Schema<ILessonSchema>(
  {
    id: String,
    prof: String,
  },
  { versionKey: false }
);

export const Lesson: Model<ILessonModel> = model<ILessonModel>(
  "Lesson",
  lessonSchema,
  "Lessons"
);
