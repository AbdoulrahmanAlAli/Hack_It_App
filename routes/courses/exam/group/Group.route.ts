import { Router } from "express";
import verifyToken from "../../../../middlewares/verifyToken";
import { groupController } from "../../../../controllers/courses/exam/group/Group.controller";
import checkRole from "../../../../middlewares/checkRole";

const router: Router = Router();

router
  .route("/")
  .post(verifyToken, checkRole(["admin"]), groupController.createGroup);

router.route("/:id").get(verifyToken, groupController.getGroupById);

router
  .route("/exam/:examId")
  .get(verifyToken, groupController.getGroupsByExamId);

router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), groupController.updateGroup);

router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), groupController.deleteGroup);

router
  .route("/exam/:examId")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    groupController.deleteGroupsByExamId
  );

export default router;
