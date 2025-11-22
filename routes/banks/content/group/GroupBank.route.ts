import { Router } from "express";
import { groupBankController } from "../../../../controllers/banks/content/group/GroupBank.controller";
import verifyToken from "../../../../middlewares/verifyToken";
import checkRole from "../../../../middlewares/checkRole";

const router: Router = Router();

router
  .route("/")
  .post(verifyToken, checkRole(["admin"]), groupBankController.createGroupBank);

router.route("/:id").get(verifyToken, groupBankController.getGroupBankById);

router
  .route("/content/:contentId")
  .get(verifyToken, groupBankController.getGroupsBankByContentId);

router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), groupBankController.updateGroupBank);

router
  .route("/:id")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    groupBankController.deleteGroupBank
  );

router
  .route("/content/:contentId")
  .delete(
    verifyToken,
    checkRole(["admin"]),
    groupBankController.deleteGroupsBankByContentId
  );

export default router;
