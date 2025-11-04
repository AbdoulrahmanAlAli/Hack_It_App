import { Router } from "express";
import upload from "../../../../middlewares/cloudinary";
import verifyToken from "../../../../middlewares/verifyToken";
import { questionController } from "../../../../controllers/courses/exam/question/Question.controller";

const router: Router = Router();

router.route("/").post(upload, questionController.createQuestion);

router.route("/:id").get(verifyToken, questionController.getQuestionById);

router
  .route("/group/:groupId")
  .get(verifyToken, questionController.getQuestionsByGroupId);

router.route("/:id").put(questionController.updateQuestion);

router
  .route("/:id/image")
  .put(upload, questionController.updateQuestionImage);

router.route("/:id").delete(questionController.deleteQuestion);

router
  .route("/group/:groupId")
  .delete(questionController.deleteQuestionsByGroupId);

router.route("/:id/image").delete(questionController.deleteQuestionImage);

export default router;