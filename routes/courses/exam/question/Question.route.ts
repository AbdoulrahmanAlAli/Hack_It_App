import { Router } from "express";
import upload from "../../../../middlewares/cloudinary";
import verifyToken from "../../../../middlewares/verifyToken";
import { questionController } from "../../../../controllers/courses/exam/question/Question.controller";
import checkRole from "../../../../middlewares/checkRole";

const router: Router = Router();

router
  .route("/")
  .post(
    verifyToken,
    checkRole(["admin"]),
    upload,
    questionController.createQuestion
  );

router.route("/:id").get(verifyToken, questionController.getQuestionById);

router
  .route("/group/:groupId")
  .get(verifyToken, questionController.getQuestionsByGroupId);

router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), questionController.updateQuestion);

router
  .route("/:id/image")
  .put(
    verifyToken,
    checkRole(["admin"]),
    upload,
    questionController.updateQuestionImage
  );

router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), questionController.deleteQuestion);

router
  .route("/group/:groupId")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    questionController.deleteQuestionsByGroupId
  );

router
  .route("/:id/image")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    questionController.deleteQuestionImage
  );

export default router;
