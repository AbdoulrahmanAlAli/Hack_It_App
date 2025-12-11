// services/video-token/VideoToken.service.ts
import mongoose from "mongoose";
import crypto from "crypto";
import {
  BadRequestError,
  NotFoundError,
} from "../../../../middlewares/handleErrors";
import { IVideoToken } from "../../../../models/courses/session/token/dtos";
import {
  VideoToken,
  validateCreateVideoToken,
} from "../../../../models/courses/session/token/Token.model";
import { generateBunnySignedIframeUrl } from "../../../../utils/bunnySignedURL";

class VideoTokenService {
  // إنشاء رمز فيديو لمرة واحدة
  static async createVideoToken(
    sessionId: string,
    videoUrl: string,
    userId?: string
  ) {
    // استخراج libraryId و videoId من رابط Bunny
    const url = new URL(videoUrl);
    const segments = url.pathname.split("/").filter(Boolean);
    const libraryId = segments[1];
    const videoId = segments[2];

    // إنشاء token فريد
    const token = crypto.randomBytes(32).toString("hex");

    const videoTokenData = {
      videoId,
      libraryId,
      token,
      sessionId,
      userId: userId || null,
    };
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestError("معرف الجلسة غير صالح");
    }

    const videoToken = await VideoToken.create(videoTokenData);

    if (!videoToken) throw new NotFoundError("فشل إنشاء رمز الفيديو");

    // إرجاع رابط الـ proxy
    return `https://hackerha.cloud/api/video/play/${token}`;
  }

  // التحقق من صلاحية الرمز واستخدامه
  static async verifyAndUseToken(token: string) {
    if (!token || typeof token !== "string") {
      throw new BadRequestError("الرمز غير صالح");
    }

    const videoToken = await VideoToken.findOne({ token });

    if (!videoToken) {
      throw new NotFoundError("الرمز غير موجود أو منتهي الصلاحية");
    }

    if (videoToken.used) {
      throw new BadRequestError("تم استخدام هذا الرابط مسبقاً");
    }

    // التحقق من انتهاء الصلاحية
    if (new Date() > videoToken.expiresAt) {
      throw new BadRequestError("انتهت صلاحية الرابط");
    }

    // تحديث حالة الـ token إلى مستخدم
    videoToken.used = true;
    await videoToken.save();

    const basicBunnyUrl = `https://iframe.mediadelivery.net/play/${videoToken.libraryId}/${videoToken.videoId}`;

    const signedVideoUrl = generateBunnySignedIframeUrl(basicBunnyUrl);

    // إرجاع رابط الفيديو الحقيقي
    return {
      videoUrl: signedVideoUrl,
      sessionId: videoToken.sessionId,
    };
  }

  // الحصول على جميع الرموز لجلسة معينة
  static async getTokensBySessionId(sessionId: string) {
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestError("معرف الجلسة غير صالح");
    }

    const tokens = await VideoToken.find({ sessionId }).sort({
      createdAt: -1,
    });

    return tokens;
  }

  // حذف رمز
  static async deleteToken(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("معرف الرمز غير صالح");
    }

    const token = await VideoToken.findByIdAndDelete(id);
    if (!token) throw new NotFoundError("الرمز غير موجود");

    return { message: "تم حذف الرمز بنجاح" };
  }

  // حذف جميع الرموز لجلسة معينة
  static async deleteTokensBySessionId(sessionId: string) {
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestError("معرف الجلسة غير صالح");
    }

    const result = await VideoToken.deleteMany({ sessionId });

    return {
      message: "تم حذف جميع رموز الجلسة بنجاح",
      deletedCount: result.deletedCount,
    };
  }
}

export { VideoTokenService };
