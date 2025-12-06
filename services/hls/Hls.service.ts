import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../../middlewares/handleErrors";
import { Student } from "../../models/users/students/Student.model";
import { Course } from "../../models/courses/Course.model";
import { Session } from "../../models/courses/session/Session.model";
import { wasabiClient } from "../../utils/wasabi.service";
import { signHlsToken, verifyHlsToken } from "../../utils/hlsToken";
import { HlsTokenPayload } from "../../utils/types";

const WASABI_BUCKET_NAME = process.env.WASABI_BUCKET_NAME as string;

// دالة مساعدة: تحويل stream لنص
const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

// تحقق من hlsToken
const assertValidHlsToken = (
  token: string,
  opts: {
    studentId: string;
    courseId: string;
    sessionId: string;
    deviceId?: string;
  }
) => {
  let payload: HlsTokenPayload;

  try {
    payload = verifyHlsToken(token);
  } catch (err) {
    throw new ForbiddenError("hlsToken غير صالح أو منتهي");
  }

  if (payload.sub !== opts.studentId) {
    throw new ForbiddenError("hlsToken لا يخص هذا الطالب");
  }

  if (
    payload.courseId !== opts.courseId ||
    payload.sessionId !== opts.sessionId
  ) {
    throw new ForbiddenError("hlsToken لا يخص هذا الكورس/الجلسة");
  }

  if (opts.deviceId && payload.deviceId && payload.deviceId !== opts.deviceId) {
    throw new ForbiddenError("hlsToken لا يخص هذا الجهاز");
  }
};

class HlsService {
  // ✅ ميثود جديدة: إصدار رابط playlist موقّت لطالب معين
  static async generatePlaylistUrlForStudent(
    studentId: string,
    courseId: string,
    sessionId: string
  ): Promise<{ playlistUrl: string; expiresIn: number }> {
    // التحقق من الطالب
    const student = await Student.findById(studentId).select(
      "enrolledCourses device_id available suspended"
    );
    if (!student) throw new NotFoundError("الطالب غير موجود");
    if (!student.available) throw new BadRequestError("الحساب غير مفعل");
    if (student.suspended) throw new BadRequestError("حسابك مقيد");

    // التحقق من الكورس
    const course = await Course.findById(courseId).select("_id");
    if (!course) throw new NotFoundError("الكورس غير موجود");

    // التحقق أن الطالب مسجّل في الكورس
    const isEnrolled = student.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (!isEnrolled) {
      throw new BadRequestError("غير مسجل في هذا الكورس");
    }

    // التحقق من الجلسة
    const session = await Session.findOne({ _id: sessionId, courseId }).select(
      "_id"
    );
    if (!session) throw new NotFoundError("الجلسة غير موجودة");

    // مدة صلاحية التوكين بالثواني (افتراضي 10 دقائق)
    const expiresInSeconds = Number(process.env.HLS_TOKEN_EXPIRES_IN || 600);

    // إصدار hlsToken موقّت مربوط بـ:
    // - الطالب
    // - الكورس
    // - الجلسة
    // - الجهاز
    const hlsToken = signHlsToken(
      {
        sub: student.id,
        courseId,
        sessionId,
        deviceId: student.device_id,
      },
      expiresInSeconds
    );

    // الـ baseUrl من env (أو localhost لو ما هو موجود)
    const baseUrl = process.env.BASE_URL || "http://localhost:1000";

    // رابط الـ playlist الذي سيستعمله Flutter / Hls.js
    const playlistUrl = `${baseUrl}/api/hackit/hls/playlist/${courseId}/${sessionId}?hlsToken=${encodeURIComponent(
      hlsToken
    )}`;

    return {
      playlistUrl,
      expiresIn: expiresInSeconds,
    };
  }

  // الحصول على AES key للتشفير
  static async getEncryptionKey(
    courseId: string,
    sessionId: string,
    hlsToken?: string
  ) {
    if (!hlsToken) {
      throw new BadRequestError("hlsToken مفقود");
    }

    const payload = verifyHlsToken(hlsToken);

    if (payload.courseId !== courseId || payload.sessionId !== sessionId) {
      throw new BadRequestError("hlsToken غير صالح");
    }

    const student = await Student.findById(payload.sub).select(
      "enrolledCourses device_id available suspended"
    );
    if (!student) throw new NotFoundError("الطالب غير موجود");
    if (!student.available) throw new BadRequestError("الحساب غير مفعل");
    if (student.suspended) throw new BadRequestError("حسابك مقيد");
    if (student.device_id !== payload.deviceId) {
      throw new BadRequestError("تم استخدام التوكن من جهاز مختلف");
    }

    const isEnrolled = student.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (!isEnrolled) {
      throw new BadRequestError("غير مسجل في هذا الكورس");
    }

    // باقي الكود كما هو:
    const fileName = `${courseId}-${sessionId}.key`;
    const keyPath = path.join(__dirname, "../../../", "keys", fileName);

    if (!fs.existsSync(keyPath)) {
      throw new NotFoundError("مفتاح التشفير غير موجود");
    }

    const key = fs.readFileSync(keyPath);
    return key;
  }

  // الحصول على playlist مع التعديلات
  static async getPlaylist(
    courseId: string,
    sessionId: string,
    hlsToken?: string
  ) {
    if (!hlsToken) {
      throw new BadRequestError("hlsToken مفقود");
    }

    // 1) فكّ التوكن وتحقق منه
    const payload = verifyHlsToken(hlsToken); // من hlsToken.ts

    if (
      payload.sub === undefined ||
      payload.courseId !== courseId ||
      payload.sessionId !== sessionId
    ) {
      throw new BadRequestError("hlsToken غير صالح");
    }

    // 2) تأكيد أن الطالب موجود ونفس الـ device ونفس الكورس
    const student = await Student.findById(payload.sub).select(
      "enrolledCourses device_id available suspended"
    );
    if (!student) throw new NotFoundError("الطالب غير موجود");
    if (!student.available) throw new BadRequestError("الحساب غير مفعل");
    if (student.suspended) throw new BadRequestError("حسابك مقيد");
    if (student.device_id !== payload.deviceId) {
      throw new BadRequestError("تم استخدام التوكن من جهاز مختلف");
    }

    const isEnrolled = student.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (!isEnrolled) {
      throw new BadRequestError("غير مسجل في هذا الكورس");
    }

    // 3) جلب الـ m3u8 من Wasabi كالمعتاد
    const session = await Session.findOne({ _id: sessionId, courseId }).lean();
    if (!session) throw new NotFoundError("الجلسة غير موجودة");

    const playlistKey = session.video as string;
    const basePrefix = playlistKey.replace(/index\.m3u8$/, "");

    const command = new GetObjectCommand({
      Bucket: WASABI_BUCKET_NAME,
      Key: playlistKey,
    });

    const wasabiRes = await wasabiClient.send(command);
    if (!wasabiRes.Body) {
      throw new BadRequestError("فشل تحميل الـ playlist");
    }

    const body = await streamToString(wasabiRes.Body as Readable);

    // 4) حقن hlsToken في روابط الـ segments والـ key
    const encodedToken = encodeURIComponent(hlsToken);

    const apiBaseSegment = `/api/hackit/hls/segment/${courseId}/${sessionId}/`;
    let modified = body.replace(
      /^(.*\.ts)\s*$/gm,
      (match) => `${apiBaseSegment}${match.trim()}?hlsToken=${encodedToken}`
    );

    const keyUri = `/api/hackit/hls/key/${courseId}/${sessionId}?hlsToken=${encodedToken}`;
    modified = modified.replace(
      /#EXT-X-KEY:METHOD=AES-128,[^\n]*/g,
      `#EXT-X-KEY:METHOD=AES-128,URI="${keyUri}"`
    );

    return modified;
  }

  // الحصول على segment
  static async getSegment(
    courseId: string,
    sessionId: string,
    segmentName: string,
    hlsToken?: string
  ) {
    if (!hlsToken) {
      throw new BadRequestError("hlsToken مفقود");
    }

    const payload = verifyHlsToken(hlsToken);

    if (payload.courseId !== courseId || payload.sessionId !== sessionId) {
      throw new BadRequestError("hlsToken غير صالح");
    }

    const student = await Student.findById(payload.sub).select(
      "enrolledCourses device_id available suspended"
    );
    if (!student) throw new NotFoundError("الطالب غير موجود");
    if (!student.available) throw new BadRequestError("الحساب غير مفعل");
    if (student.suspended) throw new BadRequestError("حسابك مقيد");
    if (student.device_id !== payload.deviceId) {
      throw new BadRequestError("تم استخدام التوكن من جهاز مختلف");
    }

    const isEnrolled = student.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (!isEnrolled) {
      throw new BadRequestError("غير مسجل في هذا الكورس");
    }

    const session = await Session.findOne({ _id: sessionId, courseId }).lean();
    if (!session) throw new NotFoundError("الجلسة غير موجودة");

    const playlistKey = session.video as string;
    const basePrefix = playlistKey.replace(/index\.m3u8$/, "");
    const segmentKey = `${basePrefix}${segmentName}`;

    const command = new GetObjectCommand({
      Bucket: WASABI_BUCKET_NAME,
      Key: segmentKey,
    });

    const wasabiRes = await wasabiClient.send(command);
    if (!wasabiRes.Body) {
      throw new BadRequestError("فشل تحميل الـ segment");
    }

    return wasabiRes.Body;
  }
}

export { HlsService };
