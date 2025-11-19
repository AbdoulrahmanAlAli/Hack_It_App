import { Router } from "express";
import { paymentController } from "../../controllers/payment/Payment.controller";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// ~ POST /api/payment/code ~ Generate payment code (Admin/University)
router
  .route("/code")
  .post(
    verifyToken,
    checkRole(["admin"]),
    paymentController.generatePaymentCode
  );

// ~ POST /api/payment/verify ~ Verify payment code (Student)
router.route("/verify").post(verifyToken, paymentController.verifyPaymentCode);

// ~ GET /api/payment/codes ~ Get all payment codes
router.get("/codes", paymentController.getAllPaymentCodes);

// ~ GET /api/payment/codes/:universityNumber ~ Get payment codes
router
  .route("/codes/:universityNumber")
  .get(verifyToken, paymentController.getStudentPaymentCodes);

// ~ GET /api/payment/enrollments/:studentId ~ Get enrollments
router
  .route("/enrollments/:studentId")
  .get(
    verifyToken,
    checkRole(["admin"]),
    paymentController.getStudentEnrollments
  );

export default router;
