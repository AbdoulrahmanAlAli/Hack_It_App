import { Router } from "express";
import verifyToken from "../../../../middlewares/verifyToken";
import checkRole from "../../../../middlewares/checkRole";
import { fileController } from "../../../../controllers/courses/session/file/File.controller";

const router: Router = Router();

// Public routes
router
  .route("/session/:sessionId")
  .get(verifyToken, checkRole(["admin"]), fileController.getFilesBySessionId);
router
  .route("/course/:courseId")
  .get(verifyToken, checkRole(["admin"]), fileController.getFilesByCourseId);

// Protected routes (require authentication)
router
  .route("/")
  .post(verifyToken, checkRole(["admin"]), fileController.createFile);
router.route("/:id").get(verifyToken, fileController.getFileById);
router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), fileController.updateFile);
router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), fileController.deleteFile);
router
  .route("/session/:sessionId/all")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    fileController.deleteFilesBySessionId
  );

export default router;
