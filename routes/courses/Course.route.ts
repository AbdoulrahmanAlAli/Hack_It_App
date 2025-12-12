import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";
import upload from "../../middlewares/cloudinary";
import { ctrlCourseController } from "../../controllers/courses/Course.controller";

const router: Router = Router();

// ~ POST /api/hackit/ctrl/course - Create course (Admin only)
router
  .route("/")
  .post(
    verifyToken,
    checkRole(["admin"]),
    upload,
    ctrlCourseController.createCourse
  );

// ~ GET /api/hackit/ctrl/course - Get all courses (Public)
router.route("/").get(verifyToken, ctrlCourseController.getAllCourses);

// ~ GET /api/hackit/ctrl/course/:id - Get course by ID (Public)
router.route("/:id").get(verifyToken, ctrlCourseController.getCourseById);

// ~ PUT /api/hackit/ctrl/course/:id - Update course (Admin/Teacher)
router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), ctrlCourseController.updateCourse);

// ~ DELETE /api/hackit/ctrl/course/:id - Delete course (Admin only)
router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), ctrlCourseController.deleteCourse);

// ~ PUT /api/hackit/ctrl/course/imagecourse/:id/ - Update course image (Admin/Teacher)
router
  .route("/imagecourse/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    upload,
    ctrlCourseController.updateCourseImage
  );

// ~ Patch => /api/hackit/ctrl/course/removeStudent/course/:courseId
router
  .route("/removeStudent/course/:courseId")
  .patch(
    verifyToken,
    checkRole(["admin"]),
    ctrlCourseController.RemoveStudentFromCourse
  );

export default router;
