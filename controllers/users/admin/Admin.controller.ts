import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CtrlAdminService } from "../../../services/users/admin/Admin.service";
import { AuthenticatedRequest } from "../../../utils/types";
import { ForbiddenError } from "../../../middlewares/handleErrors";

class AdminController {
  // Create admin account
  createNewAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await CtrlAdminService.createNewAdmin(req.body);
    res.status(201).json(result);
  });

  // Get admin profile
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as AuthenticatedRequest).user;
    const targetUserId = req.params.id;

    if (user?.id !== targetUserId) {
      throw new ForbiddenError("غير مصرح لك ");
    }

    const result = await CtrlAdminService.getProfile(targetUserId);
    res.status(200).json(result);
  });

  // Get admin by ID
  getAdminById = asyncHandler(async (req: Request, res: Response) => {
    const admin = await CtrlAdminService.getAdminById(req.params.id);
    res.status(200).json(admin);
  });

  // Get all admins
  getAllAdmins = asyncHandler(async (req: Request, res: Response) => {
    const admins = await CtrlAdminService.getAllAdmins();
    res.status(200).json(admins);
  });

  // Update admin
  updateAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await CtrlAdminService.updateAdmin(req.params.id, req.body);
    res.status(200).json(result);
  });

  // Delete admin
  deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await CtrlAdminService.deleteAdmin(req.params.id);
    res.status(200).json(result);
  });

  // Change password
  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const result = await CtrlAdminService.changePassword(
      req.params.id,
      currentPassword,
      newPassword
    );
    res.status(200).json(result);
  });
}

export const adminController = new AdminController();
