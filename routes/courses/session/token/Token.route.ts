import { Router } from "express";
import verifyToken from "../../../../middlewares/verifyToken";
import { videoTokenController } from "../../../../controllers/courses/session/token/Token.controller";

const router: Router = Router();

// إنشاء رمز فيديو (يحتاج توثيق)
router.route("/").post(
  verifyToken,
  videoTokenController.createVideoToken
);

// تشغيل الفيديو باستخدام الرمز (بدون توثيق، لأنه رمز عام)
router.route("/play/:token").get(
  videoTokenController.playVideoWithToken
);

export default router;