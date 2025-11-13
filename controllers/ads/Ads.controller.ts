import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AdsService } from "../../services/ads/Ads.service";
import { BadRequestError } from "../../middlewares/handleErrors";
import {
  validateCreateAds,
  validateUpdateAds,
} from "../../models/ads/Ads.model";
import { ICloudinaryFile } from "../../utils/types";

class AdsController {
  // إنشاء إعلان جديد
  createAds = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file as ICloudinaryFile;

    if (!file) {
      throw new BadRequestError("صورة الإعلان مطلوبة");
    }

    const { error } = validateCreateAds({ image: file.path } as any);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const newAds = await AdsService.createAds(file);

    res.status(201).json({
      success: true,
      message: "تم إنشاء الإعلان بنجاح",
      ads: newAds,
    });
  });

  // جلب جميع الإعلانات
  getAllAds = asyncHandler(async (req: Request, res: Response) => {
    const result = await AdsService.getAllAds();

    res.status(200).json(result);
  });

  // جلب إعلان معين
  getAdsById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const ads = await AdsService.getAdsById(id);
    res.status(200).json(ads);
  });

  // تحديث إعلان
  updateAds = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file as ICloudinaryFile;

    if (!file) {
      throw new BadRequestError("صورة الإعلان مطلوبة");
    }

    const { error } = validateUpdateAds({ image: file.path } as any);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const updatedAds = await AdsService.updateAds(id, file);

    res.status(200).json({
      success: true,
      message: "تم تحديث الإعلان بنجاح",
      ads: updatedAds,
    });
  });

  // حذف إعلان
  deleteAds = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdsService.deleteAds(id);
    res.status(200).json(result);
  });
}

export const adsController = new AdsController();
