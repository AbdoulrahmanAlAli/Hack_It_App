import { Document, Types } from "mongoose";

export interface IGroupBank extends Document {
  contentId: Types.ObjectId;
  mainTitle: string;
  totalMark: number;
}
