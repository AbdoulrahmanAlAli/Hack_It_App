import { Document, Types } from "mongoose";

export interface IFile extends Document {
  url: string;
  name: string;
  type: string;
  courseId: Types.ObjectId;
  sessionId: Types.ObjectId;
  description: string;
}
