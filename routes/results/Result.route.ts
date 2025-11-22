import { Router } from "express";
import { ctrlResultController } from "../../controllers/result/Result.controller";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// ~ Get => /api/univers/ctrl/result ~ Get All Results
router.route("/").get(verifyToken, ctrlResultController.getAllResults);

// ~ Get => /api/univers/ctrl/result/student/:studentId ~ Get Results by Student ID
router
  .route("/student/:studentId")
  .get(verifyToken, ctrlResultController.getResultsByStudent);

// ~ Get => /api/univers/ctrl/result/:id ~ Get Result by ID
router.route("/:id").get(verifyToken, ctrlResultController.getResultById);

// ~ Post => /api/univers/ctrl/result ~ Create New Result
router
  .route("/")
  .post(verifyToken, checkRole(["admin"]), ctrlResultController.createResult);

// ~ Put => /api/univers/ctrl/result/:id ~ Update Result
router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), ctrlResultController.updateResult);

// ~ Delete => /api/univers/ctrl/result/:id ~ Delete Result
router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), ctrlResultController.deleteResult);

export default router;
