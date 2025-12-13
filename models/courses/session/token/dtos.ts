import { Document, Types } from "mongoose";

export interface IVideoToken extends Document {
  videoId: string;          // videoId من رابط Bunny
  libraryId: string;        // libraryId من رابط Bunny
  token: string;            // الرمز الفريد
  used: boolean;            // هل تم استخدامه؟
  id: Types.ObjectId; // جلسة الفيديو
  userId?: Types.ObjectId;  // المستخدم (اختياري)
  expiresAt: Date;          // تاريخ انتهاء الصلاحية
}