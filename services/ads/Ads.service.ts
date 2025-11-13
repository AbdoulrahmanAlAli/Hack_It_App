import { NotFoundError } from "../../middlewares/handleErrors";
import { Ads } from "../../models/ads/Ads.model";
import { ICloudinaryFile } from "../../utils/types";

class AdsService {
  // إنشاء إعلان جديد
  static async createAds(file: ICloudinaryFile) {
    const imageUrl = file.path;

    const ads = new Ads({
      image: imageUrl,
    });

    await ads.save();
    return ads;
  }

  // جلب جميع الإعلانات
  static async getAllAds() {
    const ads = await Ads.find().sort({ createdAt: -1 }).lean();

    const total = await Ads.countDocuments();

    return {
      ads,
    };
  }

  // جلب إعلان معين
  static async getAdsById(adsId: string) {
    const ads = await Ads.findById(adsId);

    if (!ads) {
      throw new NotFoundError("الإعلان غير موجود");
    }

    return ads;
  }

  // تحديث إعلان
  static async updateAds(id: string, file: ICloudinaryFile) {
    const imageUrl = file.path;

    const ads = await Ads.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true, runValidators: true }
    );

    if (!ads) {
      throw new NotFoundError("الإعلان غير موجود");
    }

    return ads;
  }

  // حذف إعلان
  static async deleteAds(adsId: string) {
    const ads = await Ads.findByIdAndDelete(adsId);

    if (!ads) {
      throw new NotFoundError("الإعلان غير موجود");
    }

    return { success: true, message: "تم حذف الإعلان بنجاح" };
  }
}

export { AdsService };
