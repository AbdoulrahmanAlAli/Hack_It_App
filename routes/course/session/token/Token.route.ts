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

// الحصول على رموز جلسة معينة
router.route("/session/:sessionId").get(
  verifyToken,
  videoTokenController.getTokensBySessionId
);

// حذف رمز
router.route("/:id").delete(
  verifyToken,
  videoTokenController.deleteToken
);

// حذف جميع رموز الجلسة
router.route("/session/:sessionId").delete(
  verifyToken,
  videoTokenController.deleteTokensBySessionId
);

export default router;