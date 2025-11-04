import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { validateCreateNotification } from "../../models/notification/Notification.model";
import { BadRequestError } from "../../middlewares/handleErrors";
import { NotificationService } from "../../services/notification/Notification.service";

class NotificationController {
  // إنشاء إشعار عام
  createPublicNotification = asyncHandler(async (req: Request, res: Response) => {
    const { type, title, subtitle, time, sendPush } = req.body;

    const { error } = validateCreateNotification({ type, title, subtitle, time });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const notification = await NotificationService.createPublicNotification({
      type,
      title,
      subtitle,
      time: time ? new Date(time) : undefined,
      sendPush: sendPush || false,
    });

    let message = "تم إنشاء الإشعار العام بنجاح";
    if (sendPush) {
      message += " وتم إرساله إلى جميع الطلاب";
    }

    res.status(201).json({
      message,
    });
  });

  // الحصول على جميع الإشعارات العامة
  getPublicNotifications = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;

    const result = await NotificationService.getPublicNotifications(
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json(result);
  });

  // الحصول على الإشعارات العامة حسب النوع
  getPublicNotificationsByType = asyncHandler(async (req: Request, res: Response) => {
    const { type } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const validTypes = ['alert', 'new', 'success', 'discount', 'connection'];
    if (!validTypes.includes(type)) {
      throw new BadRequestError('نوع الإشعار غير صالح');
    }

    const result = await NotificationService.getPublicNotificationsByType(
      type,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json(result);
  });

  // إرسال إشعار تجريبي عام
  sendPublicTestNotification = asyncHandler(async (req: Request, res: Response) => {
    const result = await NotificationService.sendPublicTestNotification();
    res.status(200).json(result);
  });

  // الحصول على إحصائيات الإشعارات
  getNotificationStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = await NotificationService.getNotificationStats();
    res.status(200).json(stats);
  });

  // تحديث رمز FCM للطالب
  updateFcmToken = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fcmToken } = req.body;

    if (!fcmToken) {
      throw new BadRequestError("رمز FCM مطلوب");
    }

    const result = await NotificationService.updateFcmToken(id, fcmToken);
    res.status(200).json(result);
  });

  // إزالة رمز FCM للطالب
  removeFcmToken = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await NotificationService.removeFcmToken(id);
    res.status(200).json(result);
  });

  // تحديث إعدادات الإشعارات
  updateNotificationSettings = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const settings = req.body;

    const result = await NotificationService.updateNotificationSettings(id, settings);
    res.status(200).json(result);
  });
}

export const notificationController = new NotificationController();