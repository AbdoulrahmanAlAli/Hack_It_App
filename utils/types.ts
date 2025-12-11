import { Request } from "express";

/**
 * إرسال بريد إلكتروني بسيط
 * @param to البريد المستلم
 * @param subject عنوان الرسالة
 * @param text النص العادي للرسالة
 */
export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html: string;
}


/**
 * انشاء token
 */
export interface JWTPayload {
  id: string;
  role: string;
}

/**
 * انشاء hls token
 */
export interface HlsTokenPayload {
  sub: string; // student id
  courseId: string;
  sessionId: string;
  deviceId?: string;
  type: "hls";
}

/**
 * من اجل التحقق
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * رفع ملفات
 */
export interface ICloudinaryFile extends Express.Multer.File {
  path: string;
}

export interface CheckStudentExistenceParams {
  phoneNumber?: string;
  email?: string;
  universityNumber?: number;
}

export interface ExistenceResults {
  emailExists?: boolean;
  phoneNumberExists?: boolean;
  universityNumberExists?: boolean;
}