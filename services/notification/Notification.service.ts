
import { messaging } from 'firebase-admin';
import { Notification } from '../../models/notification/Notification.model';
import { Student } from '../../models/users/students/Student.model';
import { admin } from '../../utils/firebase-admin';
import { NotFoundError } from '../../middlewares/handleErrors';

interface CreateNotificationData {
  type: 'alert' | 'new' | 'success' | 'discount' | 'connection';
  title: string;
  subtitle: string;
  time?: Date;
  sendPush?: boolean; // هل نرسل إشعار push لجميع الطلاب
}

class NotificationService {
  // إنشاء إشعار عام لجميع الطلاب
  static async createPublicNotification(data: CreateNotificationData) {
    const notification = await Notification.create({
      type: data.type,
      title: data.title,
      subtitle: data.subtitle,
      time: data.time || new Date(),
    });

    // إرسال إشعار push لجميع الطلاب إذا طلب
    if (data.sendPush) {
      await this.sendPushToAllStudents(notification);
    }

    return notification;
  }

  // إرسال إشعار push لجميع الطلاب
  private static async sendPushToAllStudents(notification: any) {
    try {
      // جلب جميع الطلاب الذين لديهم tokens مفعلة للإشعارات
      const students = await Student.find({
        fcmToken: { $ne: null },
      }).select('fcmToken _id');

      if (students.length === 0) {
        console.log('لا يوجد طلاب لديهم رمز FCM صالح للإشعار العام');
        return;
      }

      console.log(`جاري إرسال الإشعار العام إلى ${students.length} طالب`);

      // الإرسال لجميع الطلاب على دفعات
      const batchSize = 500;
      let totalSent = 0;
      let totalFailed = 0;

      for (let i = 0; i < students.length; i += batchSize) {
        const batch = students.slice(i, i + batchSize);
        const tokens = batch.map(student => student.fcmToken!).filter(Boolean);

        if (tokens.length > 0) {
          // تحضير رسالة FCM للبث الجماعي
          const multicastMessage: messaging.MulticastMessage = {
            tokens: tokens, // الخاصية المطلوبة
            notification: {
              title: notification.title,
              body: notification.subtitle,
            },
            data: {
              type: notification.type,
              notificationId: notification._id.toString(),
              isPublic: "true",
              click_action: "FLUTTER_NOTIFICATION_CLICK",
            },
            android: {
              priority: "high" as const,
            },
            apns: {
              payload: {
                aps: {
                  sound: "default",
                  badge: 1,
                },
              },
            },
          };

          const response = await admin.messaging().sendEachForMulticast(multicastMessage);
          totalSent += response.successCount;
          totalFailed += response.failureCount;

          // معالجة الرموز الفاشلة وإزالة غير الصالحة
          response.responses.forEach((fcmResponse: messaging.SendResponse, index: number) => {
            if (!fcmResponse.success) {
              console.log(`فشل إرسال الإشعار العام إلى الرمز: ${tokens[index]}`, fcmResponse.error);
              
              // إزالة رموز FCM غير الصالحة من قاعدة البيانات
              if (fcmResponse.error?.code === 'messaging/invalid-registration-token' || 
                  fcmResponse.error?.code === 'messaging/registration-token-not-registered') {
                Student.findByIdAndUpdate(batch[index]._id, { fcmToken: null }).exec();
              }
            }
          });
        }
      }

      console.log(`تم إرسال الإشعار العام: ${totalSent} ناجح, ${totalFailed} فاشل`);
      
      return {
        totalStudents: students.length,
        successful: totalSent,
        failed: totalFailed,
      };
      
    } catch (error) {
      console.error('خطأ في إرسال الإشعار العام:', error);
      throw new Error('فشل في إرسال الإشعار العام');
    }
  }

  // الحصول على جميع الإشعارات العامة
  static async getPublicNotifications(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Notification.countDocuments();

    const formattedNotifications = notifications.map(notification => ({
      type: notification.type,
      title: notification.title,
      subtitle: notification.subtitle,
      time: this.formatTime(notification.time || notification.createdAt),
      date: this.formatDate(notification.time || notification.createdAt),
    }));

    return {
      notifications: formattedNotifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // الحصول على الإشعارات العامة حسب النوع
  static async getPublicNotificationsByType(type: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ type })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Notification.countDocuments({ type });

    const formattedNotifications = notifications.map(notification => ({
      type: notification.type,
      title: notification.title,
      subtitle: notification.subtitle,
      time: this.formatTime(notification.time || notification.createdAt),
      date: this.formatDate(notification.time || notification.createdAt),
    }));

    return {
      notifications: formattedNotifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // إرسال إشعار تجريبي عام لجميع الطلاب
  static async sendPublicTestNotification() {
    const testNotification = {
      type: 'success' as const,
      title: 'إشعار تجريبي عام',
      subtitle: 'هذا إشعار تجريبي لجميع الطلاب للتأكد من عمل النظام',
      time: new Date(),
    };

    const notification = await this.createPublicNotification({
      ...testNotification,
      sendPush: true,
    });

    return {
      success: true,
      message: 'تم إرسال الإشعار التجريبي العام إلى جميع الطلاب بنجاح',
      notification: {
        type: notification.type,
        title: notification.title,
        subtitle: notification.subtitle,
        time: this.formatTime(notification.time || notification.createdAt),
        date: this.formatDate(notification.time || notification.createdAt),
      },
    };
  }

  // الحصول على إحصائيات الإشعارات
  static async getNotificationStats() {
    const totalNotifications = await Notification.countDocuments();
    const notificationsByType = await Notification.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalStudents = await Student.countDocuments();
    const studentsWithFcm = await Student.countDocuments({ 
      fcmToken: { $ne: null },
      'notificationSettings.enabled': true 
    });

    return {
      totalNotifications,
      notificationsByType,
      students: {
        total: totalStudents,
        withFcm: studentsWithFcm,
        percentage: totalStudents > 0 ? (studentsWithFcm / totalStudents) * 100 : 0,
      },
    };
  }

  // تحديث رمز FCM للطالب
  static async updateFcmToken(studentId: string, fcmToken: string) {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { fcmToken },
      { new: true, runValidators: true }
    );

    if (!student) {
      throw new NotFoundError('الطالب غير موجود');
    }

    return { success: true, message: 'تم تحديث رمز الإشعارات بنجاح' };
  }

  // إزالة رمز FCM للطالب
  static async removeFcmToken(studentId: string) {
    await Student.findByIdAndUpdate(
      studentId,
      { fcmToken: null },
      { new: true }
    );

    return { success: true, message: 'تم إزالة رمز الإشعارات بنجاح' };
  }

  // تحديث إعدادات الإشعارات للطالب
  static async updateNotificationSettings(studentId: string, settings: any) {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { 
        $set: { 
          notificationSettings: {
            enabled: settings.enabled ?? true,
            courses: settings.courses ?? true,
            sessions: settings.sessions ?? true,
            banks: settings.banks ?? true,
            general: settings.general ?? true,
          }
        } 
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      throw new NotFoundError('الطالب غير موجود');
    }

    return { 
      success: true, 
      message: 'تم تحديث إعدادات الإشعارات بنجاح'
    };
  }

  // تنسيق الوقت إلى "6:15 م"
  private static formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'م' : 'ص';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  // تنسيق التاريخ إلى "23/5/2025"
  private static formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export { NotificationService };