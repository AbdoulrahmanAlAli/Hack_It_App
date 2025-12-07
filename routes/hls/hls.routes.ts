import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import { hlsController } from "../../controllers/hls/Hls.controller";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

router
  .route("/playlist-url/:courseId/:sessionId")
  .get(
    verifyToken,
    checkRole(["student"]),
    hlsController.getPlaylistUrlForStudent
  );

router
  .route("/key/:courseId/:sessionId")
  .get( hlsController.getEncryptionKey);

router
  .route("/playlist/:courseId/:sessionId")
  .get( hlsController.getPlaylist);

router
  .route("/segment/:courseId/:sessionId/:segmentName")
  .get( hlsController.getSegment);

export default router;
