import { Router } from "express";
import { authTeacherController } from "../../../controllers/users/teachers/Auth.controller";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";

const router: Router = Router();

// ~ Post => /api/hackit/ctrl/teacher/register ~ Create New Teacher
router
  .route("/register")
  .post(
    verifyToken,
    checkRole(["admin"]),
    authTeacherController.createNewTeacherCtrl
  );

// ~ Post => /api/hackit/ctrl/teacher/login ~ Login Teacher
router.route("/login").post(authTeacherController.loginTeacher);

export default router;
