import { Router } from "express";
import { groupBankController } from "../../../../controllers/banks/content/group/GroupBank.controller";
import verifyToken from "../../../../middlewares/verifyToken";

const router: Router = Router();

router.route("/").post(groupBankController.createGroupBank);

router.route("/:id").get(verifyToken, groupBankController.getGroupBankById);

router
  .route("/content/:contentId")
  .get(verifyToken, groupBankController.getGroupsBankByContentId);

router.route("/:id").put(groupBankController.updateGroupBank);

router.route("/:id").delete(groupBankController.deleteGroupBank);

router
  .route("/content/:contentId")
  .delete(groupBankController.deleteGroupsBankByContentId);

export default router;