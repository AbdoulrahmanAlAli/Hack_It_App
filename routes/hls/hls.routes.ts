import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
// عندك هذا
const WASABI_BUCKET_NAME = process.env.WASABI_BUCKET_NAME as string;

const router = Router();

// دالة مساعدة: تحويل stream لنص
import { Readable } from "stream";
import { AuthenticatedRequest } from "../../utils/types";
import { BadRequestError, NotFoundError } from "../../middlewares/handleErrors";
import { Student } from "../../models/users/students/Student.model";
import { Course } from "../../models/courses/Course.model";
import { Session } from "../../models/courses/session/Session.model";
import { wasabiClient } from "../../utils/wasabi.service";
import verifyToken from "../../middlewares/verifyToken";

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

/**
 * GET /api/hackit/hls/key/:courseId/:sessionId
 * يرجّع AES key بعد ما يتأكد أن الطالب مسجّل في الكورس
 */
router.get("/key/:courseId/:sessionId", async (req: Request, res: Response) => {
  // const user = (req as AuthenticatedRequest).user;
  const { courseId, sessionId } = req.params;


  // if (!user || user.role !== "student") {
  //   throw new BadRequestError("غير مصرح");
  // }

  // // تحقق أن الطالب موجود
  // const student = await Student.findById(user.id).select("enrolledCourses");
  // if (!student) {
  //   throw new NotFoundError("الطالب غير موجود");
  // }

  // // تحقق أنه مسجل في الكورس
  // const isEnrolled = student.enrolledCourses.some(
  //   (id) => id.toString() === courseId
  // );
  // if (!isEnrolled) {
  //   throw new BadRequestError("غير مسجل في هذا الكورس");
  // }

  // تحقق أن الكورس والجلسة موجودين
  const course = await Course.findById(courseId);
  if (!course) throw new NotFoundError("الكورس غير موجود");

  const session = await Session.findOne({ _id: sessionId, courseId });
  if (!session) throw new NotFoundError("الجلسة غير موجودة");

  // اسم ملف المفتاح في السيرفر، مثلاً: courseId-sessionId.key
  const fileName = `${courseId}-${sessionId}.key`;
  const keyPath = path.join(__dirname, "..", "keys", fileName);

  if (!fs.existsSync(keyPath)) {
    throw new NotFoundError("مفتاح التشفير غير موجود");
  }

  const key = fs.readFileSync(keyPath);
  res.setHeader("Content-Type", "application/octet-stream");
  res.send(key);
});

/**
 * GET /api/hackit/hls/playlist/:courseId/:sessionId
 * يرجع index.m3u8 مع تعديل روابط ts و URI الخاص بالـ key
 */
router
  .route("/playlist/:courseId/:sessionId")
  .get(async (req: Request, res: Response) => {
    // const user = (req as AuthenticatedRequest).user;
    const { courseId, sessionId } = req.params;

    // if (!user || user.role !== "student") {
    //   throw new BadRequestError("غير مصرح");
    // }

    // const student = await Student.findById(user.id).select("enrolledCourses");
    // if (!student) throw new NotFoundError("الطالب غير موجود");

    // const isEnrolled = student.enrolledCourses.some(
    //   (id) => id.toString() === courseId
    // );
    // if (!isEnrolled) {
    //   throw new BadRequestError("غير مسجل في هذا الكورس");
    // }

    const session = await Session.findOne({ _id: sessionId, courseId }).lean();
    if (!session) throw new NotFoundError("الجلسة غير موجودة");

    const playlistKey = session.video as string; // "Course_1/Session_1/index.m3u8"
    const basePrefix = playlistKey.replace(/index\.m3u8$/, ""); // "Course_1/Session_1/"

    // جيب m3u8 من Wasabi
    const command = new GetObjectCommand({
      Bucket: WASABI_BUCKET_NAME,
      Key: playlistKey,
    });

    const wasabiRes = await wasabiClient.send(command);
    if (!wasabiRes.Body) {
      throw new BadRequestError("فشل تحميل الـ playlist");
    }

    const body = await streamToString(wasabiRes.Body as Readable);

    // عدل أسطر ts لتشير للـ API بدل Wasabi
    const apiBaseSegment = `/api/hackit/hls/segment/${courseId}/${sessionId}/`;
    let modified = body.replace(
      /^(.*\.ts)\s*$/gm,
      (match) => `${apiBaseSegment}${match.trim()}`
    );

    // عدل سطر الـ KEY ليشير إلى الـ API
    const keyUri = `/api/hackit/hls/key/${courseId}/${sessionId}`;
    modified = modified.replace(
      /#EXT-X-KEY:METHOD=AES-128,[^\n]*/g,
      `#EXT-X-KEY:METHOD=AES-128,URI="${keyUri}"`
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(modified);
  });

/**
 * GET /api/hackit/hls/segment/:courseId/:sessionId/:segmentName
 * يرجّع ts واحد (proxy من Wasabi)
 */
router.get(
  "/segment/:courseId/:sessionId/:segmentName",
  async (req: Request, res: Response) => {
    // const user = (req as AuthenticatedRequest).user;
    const { courseId, sessionId, segmentName } = req.params;

    // if (!user || user.role !== "student") {
    //   throw new BadRequestError("غير مصرح");
    // }

    // const student = await Student.findById(user.id).select("enrolledCourses");
    // if (!student) throw new NotFoundError("الطالب غير موجود");

    // const isEnrolled = student.enrolledCourses.some(
    //   (id) => id.toString() === courseId
    // );
    // if (!isEnrolled) {
    //   throw new BadRequestError("غير مسجل في هذا الكورس");
    // }

    const session = await Session.findOne({ _id: sessionId, courseId }).lean();
    if (!session) throw new NotFoundError("الجلسة غير موجودة");

    const playlistKey = session.video as string; // "Course_1/Session_1/index.m3u8"
    const basePrefix = playlistKey.replace(/index\.m3u8$/, ""); // "Course_1/Session_1/"
    const segmentKey = `${basePrefix}${segmentName}`; // "Course_1/Session_1/index0.ts"

    const command = new GetObjectCommand({
      Bucket: WASABI_BUCKET_NAME,
      Key: segmentKey,
    });

    const wasabiRes = await wasabiClient.send(command);
    if (!wasabiRes.Body) {
      throw new BadRequestError("فشل تحميل الـ segment");
    }

    res.setHeader("Content-Type", "video/mp2t");
    (wasabiRes.Body as any).pipe(res);
  }
);

export default router;
