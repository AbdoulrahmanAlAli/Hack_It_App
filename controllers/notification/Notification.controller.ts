import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  validateCreateNotification,
  validateUpdateNotification,
} from "../../models/notification/Notification.model";
import { BadRequestError } from "../../middlewares/handleErrors";
import { NotificationService } from "../../services/notification/Notification.service";

class NotificationController {
  // إنشاء إشعار جديد
  createNotification = asyncHandler(async (req: Request, res: Response) => {
    const notification = await NotificationService.createNotification(req.body);

    res.status(201).json({
      message: "تم إنشاء الإشعار بنجاح",
    });
  });

  // الحصول على إشعارات الطالب (الشخصية + العامة)
  getNotificationsByStudentId = asyncHandler(
    async (req: Request, res: Response) => {
      const { studentId } = req.params;

      const result = await NotificationService.getNotificationsByStudentId(
        studentId
      );

      res.status(200).json(result);
    }
  );

  // الحصول على إشعار محدد
  getNotificationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const notification = await NotificationService.getNotificationById(id);
    res.status(200).json(notification);
  });

  // تحديث إشعار
  updateNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const studentId = (req as any).user?.id; // Assuming user ID is attached to request

    const { error } = validateUpdateNotification(updateData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const result = await NotificationService.updateNotification(id, updateData);
    res.status(200).json(result);
  });

  // حذف إشعار
  deleteNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const studentId = (req as any).user?.id; // Assuming user ID is attached to request

    const result = await NotificationService.deleteNotification(id, studentId);
    res.status(200).json(result);
  });

  getAllNotifications = asyncHandler(async (req: Request, res: Response) => {
    const result = await NotificationService.getAllNotifications();
    res.status(200).json(result);
  });
}

export const notificationController = new NotificationController();
