// src/routes/version/version.route.ts
import { Router } from "express";
import { versionController } from "../../controllers/version/Version.controller";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";


const router: Router = Router();

// Public routes
router.route("/current")
  .get(versionController.getCurrentVersion);

router.route("/check")
  .get(versionController.checkVersion);

// Protected admin routes
router.route("/")
  .get(versionController.getAllVersions)
  .post(versionController.createVersion);

router.route("/:id")
  .get(versionController.getVersionById)
  .put(versionController.updateVersion)
  .delete(versionController.deleteVersion);

export default router;