import { Router } from "express";
import verifyToken from "../../../../middlewares/verifyToken";
import { groupController } from "../../../../controllers/courses/exam/group/Group.controller";

const router: Router = Router();

router.route("/").post(groupController.createGroup);

router.route("/:id").get(verifyToken, groupController.getGroupById);

router
  .route("/exam/:examId")
  .get(verifyToken, groupController.getGroupsByExamId);

router.route("/:id").put(groupController.updateGroup);

router.route("/:id").delete(groupController.deleteGroup);

router.route("/exam/:examId").delete(groupController.deleteGroupsByExamId);

export default router;
