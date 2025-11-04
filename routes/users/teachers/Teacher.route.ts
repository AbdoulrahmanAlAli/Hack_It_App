import { Router } from "express";
import { teacherController } from "../../../controllers/users/teachers/Teacher.controller";
import upload from "../../../middlewares/cloudinary";

const router: Router = Router();

// ~ Get => /api/hackit/ctrl/teacher/accountprofileteacher/:id
router
  .route("/accountprofileteacher/:id")
  .get(teacherController.getProfileTeacher);

// ~ Post => /api/hackit/ctrl/teacher/sendemailpassword
router
  .route("/sendemailpassword")
  .post(teacherController.SendEmailForPasswordTeacher);

// ~ Post => /api/hackit/ctrl/teacher/forgetPass/:id
router.route("/forgetPass/:id").post(teacherController.ForgetPasswordTeacher);

// ~ Put => /api/hackit/ctrl/teacher/changepass/:id
router.route("/changepass/:id").put(teacherController.ChagePasswordTeacher);

// ~ Put => /api/hackit/ctrl/teacher/updatedetailsprofile/:id
router
  .route("/updatedetailsprofile/:id")
  .put(teacherController.UpdateProfileTeacher);

// ~ Put => /api/hackit/ctrl/teacher/UpdateProfileSuspendedTeacher/:id
router
  .route("/UpdateProfileSuspendedTeacher/:id")
  .put(teacherController.UpdateProfileSuspendedTeacher);

// ~ Put => /api/hackit/ctrl/teacher/UpdateProfileImpTeacherAdmin/:id
router
  .route("/UpdateProfileImpTeacherAdmin/:id")
  .put(teacherController.UpdateProfileImpTeacherAdmin);

// ~ Put => /api/hackit/ctrl/teacher/updateimageprofile/:id
router
  .route("/updateimageprofile/:id")
  .put(upload, teacherController.UpdateImageProfileTeacher);

// ~ Delete => /api/hackit/ctrl/teacher/account/:id
router.route("/account/:id").delete(teacherController.DeleteTeacherAccount);

// ~ Patch => /api/hackit/ctrl/teacher/removeStudent/course/:courseId/:teacherId
router
  .route("/removeStudent/course/:courseId/:teacherId")
  .patch(teacherController.RemoveStudentFromCourse);

export default router;
