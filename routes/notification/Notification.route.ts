import { Router } from "express";
import { notificationController } from "../../controllers/notification/Notification.controller";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// مسارات عامة (متاحة لجميع الطلاب)
router.route("/public").get(notificationController.getPublicNotifications); // أي شخص يمكنه رؤية الإشعارات العامة

router
  .route("/public/type/:type")
  .get(notificationController.getPublicNotificationsByType);

// مسارات الطالب لإدارة FCM
router
  .route("/fcm-token/:id")
  .put(verifyToken, checkRole(["admin"]), notificationController.updateFcmToken)
  .delete(
    verifyToken,
    checkRole(["admin"]),
    notificationController.removeFcmToken
  );

router
  .route("/settings/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    notificationController.updateNotificationSettings
  );

// مسارات الأدمن لإدارة الإشعارات العامة
router
  .route("/public")
  .post(
    verifyToken,
    checkRole(["admin"]),
    notificationController.createPublicNotification
  );

router
  .route("/public/test")
  .post(
    verifyToken,
    checkRole(["admin"]),
    notificationController.sendPublicTestNotification
  );

router
  .route("/stats")
  .get(
    verifyToken,
    notificationController.getNotificationStats
  );

export default router;
