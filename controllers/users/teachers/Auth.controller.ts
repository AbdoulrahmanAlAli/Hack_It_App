import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthTeacherService } from "../../../services/users/teachers/Auth.service";

class AuthTeacherController {
  // ~ Post => /api/hackit/ctrl/teacher/register ~ Create New Teacher
  createNewTeacherCtrl = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await AuthTeacherService.createNewTeacher(req.body);

      res.status(201).json(result);
    }
  );

  // ~ Post => /api/hackit/ctrl/teacher/login ~ Login Teacher
  loginTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = (await AuthTeacherService.loginTeacher(req.body)) as {
        message: string;
        token: string;
      };

      res.status(200).json({ message: result.message, token: result.token });
    }
  );
}

export const authTeacherController = new AuthTeacherController();
