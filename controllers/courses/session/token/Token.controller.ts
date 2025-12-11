import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { VideoTokenService } from "../../../../services/courses/session/token/Token.service";
import { AuthenticatedRequest } from "../../../../utils/types";
import { BadRequestError } from "../../../../middlewares/handleErrors";

class VideoTokenController {
  // إنشاء رمز فيديو
  createVideoToken = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, videoUrl } = req.body;
    const user = (req as AuthenticatedRequest).user;
    if (!user) {
      throw new BadRequestError("token not found");
    }

    const userId = user?.id;

    const tokenUrl = await VideoTokenService.createVideoToken(
      sessionId,
      videoUrl,
      userId
    );

    res.status(201).json({
      success: true,
      data: { tokenUrl },
      message: "تم إنشاء رابط الفيديو لمرة واحدة",
    });
  });

  // تشغيل الفيديو باستخدام الرمز
  playVideoWithToken = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;

    const result = await VideoTokenService.verifyAndUseToken(token);

    return res.redirect(result.videoUrl);
  });

  // الحصول على رموز جلسة معينة
  getTokensBySessionId = asyncHandler(async (req: Request, res: Response) => {
    const tokens = await VideoTokenService.getTokensBySessionId(
      req.params.sessionId
    );

    res.status(200).json({
      success: true,
      data: tokens,
    });
  });

  // حذف رمز
  deleteToken = asyncHandler(async (req: Request, res: Response) => {
    const result = await VideoTokenService.deleteToken(req.params.id);

    res.status(200).json(result);
  });

  // حذف جميع رموز الجلسة
  deleteTokensBySessionId = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await VideoTokenService.deleteTokensBySessionId(
        req.params.sessionId
      );

      res.status(200).json(result);
    }
  );
}

export const videoTokenController = new VideoTokenController();
