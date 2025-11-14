import { Document } from "mongoose";

export interface IAdmin extends Document {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
