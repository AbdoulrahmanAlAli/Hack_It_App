import { NotFoundError } from "../../middlewares/handleErrors";
import { IVersion } from "../../models/version/dtos";
import { Version } from "../../models/version/Version.model";

class VersionService {
  // جلب الإصدار الحالي
  static async getCurrentVersion() {
    const version = await Version.findOne().sort({ createdAt: -1 });

    if (!version) {
      throw new NotFoundError("لا يوجد إصدار مضاف");
    }

    return version;
  }

  // إنشاء إصدار جديد
  static async createVersion(versionData: IVersion) {
    const version = new Version({
      version: versionData.version,
      url: versionData.url,
    });

    await version.save();
    return version;
  }

  // جلب جميع الإصدارات
  static async getAllVersions(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const versions = await Version.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Version.countDocuments();

    return {
      versions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // جلب إصدار معين
  static async getVersionById(versionId: string) {
    const version = await Version.findById(versionId);

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    return version;
  }

  // تحديث إصدار
  static async updateVersion(versionId: string, versionData: IVersion) {
    const version = await Version.findByIdAndUpdate(
      versionId,
      { version: versionData.version, url: versionData.url },
      { new: true, runValidators: true }
    );

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    return version;
  }

  // حذف إصدار
  static async deleteVersion(versionId: string) {
    const version = await Version.findByIdAndDelete(versionId);

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    return { success: true, message: "تم حذف الإصدار بنجاح" };
  }

  // التحقق من الإصدار
  static async checkVersion(versionToCheck: string) {
    const currentVersion = await this.getCurrentVersion();

    const isLatest = currentVersion.version === versionToCheck;

    return {
      isLatest,
      currentVersion: currentVersion.version,
      needsUpdate: !isLatest,
    };
  }
}

export { VersionService };
