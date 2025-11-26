import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../middlewares/handleErrors";
import { IVersion } from "../../models/version/dtos";
import {
  Version,
  validateCreateVersion,
  validateUpdateVersion,
} from "../../models/version/Version.model";

class VersionService {
  // Get current version (latest)
  static async getCurrentVersion() {
    const version = await Version.findOne().sort({ createdAt: -1 });

    if (!version) {
      throw new NotFoundError("لا يوجد إصدار مضاف");
    }

    return version;
  }

  // Create new version
  static async createVersion(versionData: IVersion) {
    const { error } = validateCreateVersion(versionData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Check if version already exists
    const existingVersion = await Version.findOne({
      version: versionData.version,
    });

    if (existingVersion) {
      throw new BadRequestError("رقم الإصدار موجود مسبقاً");
    }

    const version = await Version.create({
      version: versionData.version,
      url: versionData.url,
    });

    return {
      message: "تم إنشاء الإصدار بنجاح",
    };
  }

  // Get all versions with pagination
  static async getAllVersions(
    page: number = 1,
    limit: number = 20,
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc"
  ) {
    const skip = (page - 1) * limit;
    const sort: any = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const versions = await Version.find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("version url createdAt updatedAt")
      .lean();

    const total = await Version.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return {
      versions,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        limit,
      },
    };
  }

  // Get version by ID
  static async getVersionById(versionId: string) {
    if (!mongoose.Types.ObjectId.isValid(versionId)) {
      throw new BadRequestError("معرف الإصدار غير صالح");
    }

    const version = await Version.findById(versionId).select(
      "version url createdAt updatedAt"
    );

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    return version;
  }

  // Update version
  static async updateVersion(
    versionId: string,
    versionData: Partial<IVersion>
  ) {
    const { error } = validateUpdateVersion(versionData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    if (!mongoose.Types.ObjectId.isValid(versionId)) {
      throw new BadRequestError("معرف الإصدار غير صالح");
    }

    // Check if version number already exists (if updating version)
    if (versionData.version) {
      const existingVersion = await Version.findOne({
        version: versionData.version,
        _id: { $ne: versionId },
      });

      if (existingVersion) {
        throw new BadRequestError("رقم الإصدار موجود مسبقاً");
      }
    }

    const version = await Version.findByIdAndUpdate(versionId, versionData, {
      new: true,
      runValidators: true,
    }).select("version url createdAt updatedAt");

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    return {
      message: "تم تحديث الإصدار بنجاح",
      version,
    };
  }

  // Delete version
  static async deleteVersion(versionId: string) {
    if (!mongoose.Types.ObjectId.isValid(versionId)) {
      throw new BadRequestError("معرف الإصدار غير صالح");
    }

    const version = await Version.findByIdAndDelete(versionId);

    if (!version) {
      throw new NotFoundError("الإصدار غير موجود");
    }

    // Check if there are any versions left
    const remainingVersions = await Version.countDocuments();

    return {
      message: "تم حذف الإصدار بنجاح",
      remainingVersions,
      isLastVersion: remainingVersions === 0,
    };
  }
}

export { VersionService };
