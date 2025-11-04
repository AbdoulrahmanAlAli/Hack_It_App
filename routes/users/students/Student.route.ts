import { Router } from "express";
import { ctrlStudentController } from "../../../controllers/users/students/Student.controller";
import verifyToken from "../../../middlewares/verifyToken";
import checkRole from "../../../middlewares/checkRole";
import upload from "../../../middlewares/cloudinary";

const router: Router = Router();

// ~ Get => /api/hackit/ctrl/student/accountprofilestudent/:id ~ Get Profile Student

router
  .route("/accountprofilestudent/:id")
  .get(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.getProfileStudent
  );

// ~ Get => /api/hackit/ctrl/student/favorites/:id ~ Get Favorites Student
router
  .route("/favorites/:id")
  .get(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.getFavoriteStudent
  );

// ~ Get => /api/hackit/ctrl/student/banks/:id ~ Get aggregated banks and contents for student
router
  .route("/workcontinue/:id")
  .get(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.getBanksAndContents
  );

// ~ Get => /api/hackit/ctrl/student/enrolledcourses/:id ~ Get enrolled courses for student
router
  .route("/enrolledcourses/:id")
  .get(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.getEnrolledCourses
  );

// ~ Post => /api/hackit/ctrl/student/sendemailpassword ~ Send Email For Password For Student
router
  .route("/sendemailpassword")
  .post(ctrlStudentController.sendEmailForPasswordStudent);

// ~ Post => /api/hackit/ctrl/student/forgetPass/:id ~ Forget Password For Student
router
  .route("/forgetPass/:id")
  .post(ctrlStudentController.forgetPasswordStudent);

// ~ Post => /api/hackit/ctrl/student/changepass/:id ~ Change Password For Student
router.route("/changepass/:id").put(ctrlStudentController.ChagePasswordStudent);

// ~ Put => /api/hackit/ctrl/student/updatedetailsprofile/:id ~ Change details of student
router
  .route("/updatedetailsprofile/:id")
  .put(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.UpdateProfileStudent
  );

// ~ Put => /api/hackit/ctrl/student/UpdateProfileImpStudentAdmin/:id ~ Change important details of student
router
  .route("/updateprofileimpstudentadmin/:id")
  .put(ctrlStudentController.UpdateProfileImpStudentAdmin);

// ~ Put => /api/hackit/ctrl/student/UpdateProfileSuspendedStudent/:id ~ Change Suspended of student
router
  .route("/UpdateProfileSuspendedStudent/:id")
  .put(ctrlStudentController.UpdateProfileSuspendedStudent);

// ~ Put => /api/hackit/ctrl/student/updateimageprofile/:id ~ Change Image of student
router
  .route("/updateimageprofile/:id")
  .put(
    verifyToken,
    checkRole(["student"]),
    upload,
    ctrlStudentController.UpdateImageProfileStudent
  );

// ~ Delete => /api/hackit/ctrl/student/account/:id ~ Delete Student Account
router
  .route("/account/:id")
  .delete(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.DeleteStudentAccount
  );

// ~ patch /api/hackit/ctrl/student/favorite/course/:courseId/toggle/:id
router.patch(
  "/favorite/course/:courseId/toggle/:id",
  verifyToken,
  checkRole(["student"]),
  ctrlStudentController.toggleFavoriteCourse
);

// ~ patch /api/hackit/ctrl/student/favorite/session/:sessionId/toggle/:id
router.patch(
  "/favorite/session/:sessionId/toggle/:id",
  verifyToken,
  checkRole(["student"]),
  ctrlStudentController.toggleFavoriteSession
);

// ~ patch /api/hackit/ctrl/student/favorite/bank/:bankId/toggle/:id
router.patch(
  "/favorite/bank/:bankId/toggle/:id",
  verifyToken,
  checkRole(["student"]),
  ctrlStudentController.toggleFavoriteBank
);

// ~ Get => /api/hackit/ctrl/student/check-existence ~ Check if phone, email, or university number exists
router
  .route("/check-existence")
  .get(ctrlStudentController.checkStudentExistence);

// ~ Get => /api/hackit/ctrl/student/favorites/check/:id ~ Check if item is in student favorites using query
router
  .route("/favorites/check/:id")
  .get(verifyToken, ctrlStudentController.checkFavoriteItem);

// ~ Patch => /api/hackit/ctrl/student/bank/:bankId/content/:contentId/user/:id
router
  .route("/bank/:bankId/content/:contentId/user/:id")
  .patch(
    verifyToken,
    checkRole(["student"]),
    ctrlStudentController.addBankAndContentForStudent
  );

export default router;
