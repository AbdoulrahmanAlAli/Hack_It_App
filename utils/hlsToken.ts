// src/utils/hlsToken.ts
import jwt from "jsonwebtoken";
import { BadRequestError, ForbiddenError } from "../middlewares/handleErrors";

const HLS_SECRET =
  process.env.HLS_TOKEN_SECRET || (process.env.JWT_SECRET as string);

export interface HlsTokenPayload {
  sub: string; // studentId
  courseId: string;
  sessionId: string;
  deviceId: string;
  type: "hls";
  iat?: number;
  exp?: number;
}

// إنشاء HLS Token
export function signHlsToken(
  payload: Omit<HlsTokenPayload, "type">,
  expiresInSeconds: number = 600
): string {
  const data: HlsTokenPayload = {
    ...payload,
    type: "hls",
  };

  return jwt.sign(data, HLS_SECRET, { expiresIn: expiresInSeconds });
}

// قراءة التوكن فقط (من دون شرط)
export function verifyHlsToken(token: string): HlsTokenPayload {
  const decoded = jwt.verify(token, HLS_SECRET) as HlsTokenPayload;

  if (decoded.type !== "hls") {
    throw new ForbiddenError("Invalid token type");
  }

  return decoded;
}

// ⭐ الدالة المهمة: التأكد أن التوكن صحيح ومطابق للطالب والجلسة
export function assertValidHlsToken(
  token: string,
  expected: {
    studentId: string;
    courseId: string;
    sessionId: string;
    deviceId: string;
  }
): HlsTokenPayload {
  if (!token) {
    throw new BadRequestError("hlsToken مفقود");
  }

  let decoded: HlsTokenPayload;
  try {
    decoded = verifyHlsToken(token);
  } catch (err) {
    throw new ForbiddenError("hlsToken غير صالح أو منتهي");
  }

  if (
    decoded.sub !== expected.studentId ||
    decoded.courseId !== expected.courseId ||
    decoded.sessionId !== expected.sessionId ||
    decoded.deviceId !== expected.deviceId
  ) {
    throw new ForbiddenError("hlsToken لا يتطابق مع بيانات الطالب أو جهازه");
  }

  return decoded;
}
