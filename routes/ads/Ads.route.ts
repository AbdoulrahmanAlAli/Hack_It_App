// src/routes/ads/ads.route.ts
import { Router } from "express";
import { adsController } from "../../controllers/ads/Ads.controller";
import upload from "../../middlewares/cloudinary";
import verifyToken from "../../middlewares/verifyToken";

const router: Router = Router();

// Protected admin routes
router
  .route("/")
  .get(adsController.getAllAds)
  .post(upload, adsController.createAds);

router
  .route("/:id")
  .get(verifyToken, adsController.getAdsById)
  .put(upload, adsController.updateAds)
  .delete(adsController.deleteAds);

export default router;
