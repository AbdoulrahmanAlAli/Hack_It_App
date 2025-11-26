import { Document, Types } from "mongoose";

export interface ISession extends Document {
  number: number;
  courseId: Types.ObjectId;
  video: string;
  name: string;
  likes: Types.ObjectId[]; // likes from students
  disLikes: Types.ObjectId[]; // disLikes from students
  note: string;
  files: Types.ObjectId[];
  duration: string;
  available: boolean;
}
