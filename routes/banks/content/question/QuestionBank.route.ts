import { Router } from "express";
import upload from "../../../../middlewares/cloudinary";
import { questionBankController } from "../../../../controllers/banks/content/question/QuestionBank.controller";
import verifyToken from "../../../../middlewares/verifyToken";
import checkRole from "../../../../middlewares/checkRole";

const router: Router = Router();

router
  .route("/")
  .post(
    verifyToken,
    checkRole(["admin"]),
    upload,
    questionBankController.createQuestionBank
  );

router
  .route("/:id")
  .get(verifyToken, questionBankController.getQuestionBankById);

router
  .route("/group/:groupBankId")
  .get(verifyToken, questionBankController.getQuestionsBankByGroupId);

router
  .route("/:id")
  .put(
    verifyToken,
    checkRole(["admin"]),
    questionBankController.updateQuestionBank
  );

router
  .route("/:id/image")
  .put(
    verifyToken,
    checkRole(["admin"]),
    upload,
    questionBankController.updateQuestionBankImage
  );

router
  .route("/:id")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    questionBankController.deleteQuestionBank
  );

router
  .route("/group/:groupBankId")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    questionBankController.deleteQuestionsBankByGroupId
  );

router
  .route("/:id/image")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    questionBankController.deleteQuestionBankImage
  );

export default router;
