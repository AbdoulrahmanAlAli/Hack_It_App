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
}

export const videoTokenController = new VideoTokenController();
