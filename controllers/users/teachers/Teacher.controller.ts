import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CtrlTeacherService } from "../../../services/users/teachers/Teacher.service";
import { ICloudinaryFile } from "../../../utils/types";
import { BadRequestError } from "../../../middlewares/handleErrors";

class TeacherController {
  // ~ Get => /api/hackit/ctrl/teacher/accountprofileteacher/:id ~ Get Profile Teacher
  getProfileTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const teacher = await CtrlTeacherService.getProfileTeacher(req.params.id);
      res.status(200).json(teacher);
    }
  );

  // ~ Post => /api/hackit/ctrl/teacher/sendemailpassword ~ Send Email For Password For Teacher
  SendEmailForPasswordTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.SendEmailForPasswordTeacher(
        req.body
      );
      res.status(200).json(result);
    }
  );

  // ~ Post => /api/hackit/ctrl/teacher/forgetPass/:id ~ Forget Password For Teacher
  ForgetPasswordTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.ForgetPasswordTeacher(
        req.body,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Put => /api/hackit/ctrl/teacher/changepass/:id ~ Change Password For Teacher
  ChagePasswordTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.ChagePasswordTeacher(
        req.body,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Put => /api/hackit/ctrl/teacher/updatedetailsprofile/:id ~ Change details of teacher
  UpdateProfileTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.UpdateProfileTeacher(
        req.body,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Put => /api/hackit/ctrl/teacher/UpdateProfileSuspendedTeacher/:id ~ Change Suspended of teacher
  UpdateProfileSuspendedTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.UpdateProfileSuspendedTeacher(
        req.body,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Put => /api/hackit/ctrl/teacher/UpdateProfileImpTeacherAdmin/:id ~ Change important details of teacher
  UpdateProfileImpTeacherAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.UpdateProfileImpTeacherAdmin(
        req.body,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Put => /api/hackit/ctrl/teacher/updateimageprofile/:id ~ Change Image of teacher
  UpdateImageProfileTeacher = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.UpdateImageProfileTeacher(
        req.file as ICloudinaryFile,
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Delete => /api/hackit/ctrl/teacher/account/:id ~ Delete Teacher Account
  DeleteTeacherAccount = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await CtrlTeacherService.DeleteTeacherAccount(
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  // ~ Patch => /api/hackit/ctrl/teacher/removeStudent/course/:courseId/:teacherId
  RemoveStudentFromCourse = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { teacherId, courseId } = req.params;
      const { studentId } = req.body;

      if (!studentId) {
        throw new BadRequestError("معرف الطالب مطلوب");
      }

      const result = await CtrlTeacherService.RemoveStudentFromCourse(
        teacherId,
        courseId,
        studentId
      );
      res.status(200).json(result);
    }
  );
}

export const teacherController = new TeacherController();
