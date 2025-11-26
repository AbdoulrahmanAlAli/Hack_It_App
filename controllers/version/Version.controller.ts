import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { VersionService } from "../../services/version/Version.service";
import { BadRequestError } from "../../middlewares/handleErrors";
import {
  validateCreateVersion,
  validateUpdateVersion,
} from "../../models/version/Version.model";

class VersionController {
  // جلب الإصدار الحالي
  getCurrentVersion = asyncHandler(async (req: Request, res: Response) => {
    const version = await VersionService.getCurrentVersion();
    res.status(200).json(version);
  });

  // إنشاء إصدار جديد
  createVersion = asyncHandler(async (req: Request, res: Response) => {
    const newVersion = await VersionService.createVersion(req.body);

    res.status(201).json({
      message: "تم إنشاء الإصدار بنجاح"
    });
  });

  // جلب جميع الإصدارات
  getAllVersions = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;

    const result = await VersionService.getAllVersions(
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json(result);
  });

  // جلب إصدار معين
  getVersionById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const version = await VersionService.getVersionById(id);
    res.status(200).json(version);
  });

  // تحديث إصدار
  updateVersion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { version } = req.body;

    const { error } = validateUpdateVersion({ version } as any);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const updatedVersion = await VersionService.updateVersion(id, version);

    res.status(200).json({
      message: "تم تحديث الإصدار بنجاح",
    });
  });

  // حذف إصدار
  deleteVersion = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VersionService.deleteVersion(id);
    res.status(200).json(result);
  });
}

export const versionController = new VersionController();
