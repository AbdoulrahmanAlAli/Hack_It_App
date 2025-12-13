import { Router } from "express";
import { teacherController } from "../../../controllers/users/teachers/Teacher.controller";
import upload from "../../../middlewares/cloudinary";
import checkRole from "../../../middlewares/checkRole";
import verifyToken from "../../../middlewares/verifyToken";

const router: Router = Router();

// ~ Get => /api/hackit/ctrl/teacher/accountprofileteacher/:id
router
  .route("/accountprofileteacher/:id")
  .get(verifyToken, checkRole(["admin"]), teacherController.getProfileTeacher);

// ~ Get => /api/hackit/ctrl/teacher
router
  .route("")
  .get(
    verifyToken,
    checkRole(["admin"]),
    teacherController.SendEmailForPasswordTeacher
  );

// ~ Post => /api/hackit/ctrl/teacher/forgetPass/:id
router
  .route("/forgetPass/:id")
  .post(
    verifyToken,
    checkRole(["admin"]),
    teacherController.ForgetPasswordTeacher
  );

// ~ Put => /api/hackit/ctrl/teacher/changepass/:id
router
  .route("/changepass/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    teacherController.ChagePasswordTeacher
  );

// ~ Put => /api/hackit/ctrl/teacher/updatedetailsprofile/:id
router
  .route("/updatedetailsprofile/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    teacherController.UpdateProfileTeacher
  );

// ~ Put => /api/hackit/ctrl/teacher/UpdateProfileSuspendedTeacher/:id
router
  .route("/UpdateProfileSuspendedTeacher/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    teacherController.UpdateProfileSuspendedTeacher
  );

// ~ Put => /api/hackit/ctrl/teacher/UpdateProfileImpTeacherAdmin/:id
router
  .route("/UpdateProfileImpTeacherAdmin/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    teacherController.UpdateProfileImpTeacherAdmin
  );

// ~ Put => /api/hackit/ctrl/teacher/updateimageprofile/:id
router
  .route("/updateimageprofile/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    upload,
    teacherController.UpdateImageProfileTeacher
  );

// ~ Delete => /api/hackit/ctrl/teacher/account/:id
router
  .route("/account/:id")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    teacherController.DeleteTeacherAccount
  );

// ~ Patch => /api/hackit/ctrl/teacher/removeStudent/course/:courseId/:teacherId
router
  .route("/removeStudent/course/:courseId/:teacherId")
  .patch(
    verifyToken,
    checkRole(["admin"]),
    teacherController.RemoveStudentFromCourse
  );

// ~ GET => /api/hackit/ctrl/teacher/removeStudent/course/:courseId/:teacherId
router
  .route("/all")
  .get(
    verifyToken,
    checkRole(["admin"]),
    teacherController.getTeachers
  );

export default router;
