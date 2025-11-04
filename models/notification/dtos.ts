import { Document, Types } from "mongoose";

export interface INotification extends Document {
  type: 'alert' | 'new' | 'success' | 'discount' | 'connection';
  title: string;
  subtitle: string;
  time: Date;
  createdAt: Date;
}