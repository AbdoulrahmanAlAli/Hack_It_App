import { Router } from "express";
import { notificationController } from "../../controllers/notification/Notification.controller";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// إنشاء إشعار (للمشرف فقط)
router
  .route("/")
  .post(
    verifyToken,
    checkRole(["admin"]),
    notificationController.createNotification
  );

// الحصول على إشعارات الطالب (الشخصية + العامة)
router
  .route("/student/:studentId")
  .get(verifyToken, notificationController.getNotificationsByStudentId);

// الحصول على إشعار محدد
router
  .route("/:id")
  .get(verifyToken, notificationController.getNotificationById);

// تحديث إشعار
router
  .route("/:id")
  .put(verifyToken, notificationController.updateNotification);

// حذف إشعار
router
  .route("/:id")
  .delete(verifyToken, notificationController.deleteNotification);

router
  .route("/")
  .get(
    verifyToken,
    checkRole(["admin"]),
    notificationController.getAllNotifications
  );
export default router;
