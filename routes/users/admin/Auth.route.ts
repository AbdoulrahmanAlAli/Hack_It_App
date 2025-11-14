 import { Router } from "express";
import { authAdminController } from "../../../controllers/users/admin/Auth.controller";

const router: Router = Router();

// Public auth routes
router.route("/login").post(authAdminController.loginAdmin);

export default router;