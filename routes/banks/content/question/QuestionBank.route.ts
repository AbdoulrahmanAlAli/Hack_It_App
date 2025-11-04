import { Router } from "express";
import upload from "../../../../middlewares/cloudinary";
import { questionBankController } from "../../../../controllers/banks/content/question/QuestionBank.controller";
import verifyToken from "../../../../middlewares/verifyToken";

const router: Router = Router();

router.route("/").post(upload, questionBankController.createQuestionBank);

router.route("/:id").get(verifyToken, questionBankController.getQuestionBankById);

router
  .route("/group/:groupBankId")
  .get(verifyToken, questionBankController.getQuestionsBankByGroupId);

router.route("/:id").put(questionBankController.updateQuestionBank);

router
  .route("/:id/image")
  .put(upload, questionBankController.updateQuestionBankImage);

router.route("/:id").delete(questionBankController.deleteQuestionBank);

router
  .route("/group/:groupBankId")
  .delete(questionBankController.deleteQuestionsBankByGroupId);

router.route("/:id/image").delete(questionBankController.deleteQuestionBankImage);

export default router;