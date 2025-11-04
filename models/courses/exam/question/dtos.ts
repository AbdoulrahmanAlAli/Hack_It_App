import { Document, Types } from "mongoose";

export interface IAnswer extends Document {
  title: string;
  correct: boolean;
}

export interface IQuestion extends Document {
  groupId: Types.ObjectId;
  title: string;
  subTitle: string;
  image: string;
  answers: IAnswer[];
  mark: number;
  note: string;
  direction: "ltr" | "rtl";
}
