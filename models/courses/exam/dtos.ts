import { Document, Types } from "mongoose";

export interface IExam  extends Document {
    number: number;
    courseId: Types.ObjectId;
    title: string;
    duration: string;
}