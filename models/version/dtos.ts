import { Document, Types } from "mongoose";

export interface IVersion extends Document {
  version: string;
  url: string;
}
