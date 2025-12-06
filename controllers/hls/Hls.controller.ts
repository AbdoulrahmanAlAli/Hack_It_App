import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest } from "../../utils/types";
import { HlsService } from "../../services/hls/Hls.service";
import { BadRequestError } from "../../middlewares/handleErrors";

class HlsController {
  /**
   * GET /api/hackit/ctrl/hls/playlist/:courseId/:sessionId
   * يرجع playlistUrl (مع hlsToken) ليستخدمه تطبيق Flutter
   */
  getPlaylistUrlForStudent = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = (req as AuthenticatedRequest).user;
      const { courseId, sessionId } = req.params;

      if (!user) {
        throw new BadRequestError("غير مصرح");
      }

      const { playlistUrl, expiresIn } =
        await HlsService.generatePlaylistUrlForStudent(
          user.id,
          courseId,
          sessionId
        );

      res.status(200).json({
        playlistUrl,
        expiresIn,
      });
    }
  );

  /**
   * GET /api/hackit/hls/key/:courseId/:sessionId
   */
  getEncryptionKey = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sessionId } = req.params;
    const hlsToken = req.query.hlsToken as string | undefined;

    const key = await HlsService.getEncryptionKey(
      courseId,
      sessionId,
      hlsToken
    );

    res.setHeader("Content-Type", "application/octet-stream");
    res.send(key);
  });

  /**
   * GET /api/hackit/hls/playlist/:courseId/:sessionId
   */
  getPlaylist = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sessionId } = req.params;
    const hlsToken = req.query.hlsToken as string | undefined;

    const playlist = await HlsService.getPlaylist(
      courseId,
      sessionId,
      hlsToken
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(playlist);
  });

  /**
   * GET /api/hackit/hls/segment/:courseId/:sessionId/:segmentName
   */
  getSegment = asyncHandler(async (req: Request, res: Response) => {
    const { courseId, sessionId, segmentName } = req.params;
    const hlsToken = req.query.hlsToken as string | undefined;

    const segmentStream = await HlsService.getSegment(
      courseId,
      sessionId,
      segmentName,
      hlsToken
    );

    res.setHeader("Content-Type", "video/mp2t");
    (segmentStream as any).pipe(res);
  });
}

export const hlsController = new HlsController();
