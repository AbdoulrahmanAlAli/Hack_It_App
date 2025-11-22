import { Router } from "express";
import { ctrlBanksController } from "../../controllers/banks/Bank.controller";
import upload from "../../middlewares/cloudinary";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";

const router: Router = Router();

// ~ Get => /api/hackit/ctrl/bank ~ Get All Banks
router.route("/").get(verifyToken, ctrlBanksController.getAllBanks);

// ~ Get => /api/hackit/ctrl/bank/:id ~ Get Single Bank
router.route("/:id").get(verifyToken, ctrlBanksController.getSingleBank);

// ~ Post => /api/hackit/ctrl/bank ~ Create New Bank
router
  .route("/")
  .post(
    verifyToken,
    checkRole(["admin"]),
    upload,
    ctrlBanksController.createNewBank
  );

// ~ Put => /api/hackit/ctrl/bank/:id ~ Update Bank
router
  .route("/:id")
  .put(verifyToken, checkRole(["admin"]), ctrlBanksController.updateBank);

// ~ Delete => /api/hackit/ctrl/bank/:id ~ Delete Bank
router
  .route("/:id")
  .delete(verifyToken, checkRole(["admin"]), ctrlBanksController.deleteBank);

// ~ put => /api/hackit/ctrl/bank/:id/image ~ Update Image Bank
router
  .route("/:id/image")
  .put(
    verifyToken,
    checkRole(["admin"]),
    upload,
    ctrlBanksController.updateImageBank
  );

export default router;
