// src/routes/ads/ads.route.ts
import { Router } from "express";
import { adsController } from "../../controllers/ads/Ads.controller";
import upload from "../../middlewares/cloudinary";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// Protected admin routes
router
  .route("/")
  .get(verifyToken, adsController.getAllAds)
  .post(verifyToken, checkRole(["admin"]), upload, adsController.createAds);

router
  .route("/:id")
  .get(verifyToken, adsController.getAdsById)
  .put(verifyToken, checkRole(["admin"]), upload, adsController.updateAds)
  .delete(verifyToken, checkRole(["admin"]), adsController.deleteAds);

export default router;
