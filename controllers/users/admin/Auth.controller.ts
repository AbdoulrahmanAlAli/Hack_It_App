import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthAdminService } from "../../../services/users/admin/Auth.service";

class AuthAdminController {
  // Login admin
  loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = (await AuthAdminService.loginAdmin(req.body)) as {
      message: string;
      token: string;
    };

    res.status(200).json({ message: result.message, token: result.token });
  });
}

export const authAdminController = new AuthAdminController();
