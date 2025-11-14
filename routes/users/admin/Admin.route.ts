import { Router } from "express";
import { adminController } from "../../../controllers/users/admin/Admin.controller";

const router: Router = Router();

// Protected admin routes (require authentication)
router.route("/create").post(adminController.createNewAdmin);
router.route("/profile/:id").get(adminController.getProfile);
router.route("/").get(adminController.getAllAdmins);
router.route("/:id").get(adminController.getAdminById);
router.route("/:id").put(adminController.updateAdmin);
router.route("/:id").delete(adminController.deleteAdmin);
router.route("/:id/change-password").put(adminController.changePassword);

export default router;
