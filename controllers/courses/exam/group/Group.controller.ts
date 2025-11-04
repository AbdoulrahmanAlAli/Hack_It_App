import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { GroupService } from "../../../../services/courses/exam/group/Group.service";

class GroupController {
  // Create group
  createGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupService.createGroup(req.body);
    res.status(201).json(result);
  });

  // Get group by ID
  getGroupById = asyncHandler(async (req: Request, res: Response) => {
    const group = await GroupService.getGroupById(req.params.id);
    res.status(200).json(group);
  });

  // Get groups by exam ID
  getGroupsByExamId = asyncHandler(
    async (req: Request, res: Response) => {
      const groups = await GroupService.getGroupsByExamId(
        req.params.examId
      );
      res.status(200).json(groups);
    }
  );

  // Update group
  updateGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupService.updateGroup(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  });

  // Delete group
  deleteGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupService.deleteGroup(req.params.id);
    res.status(200).json(result);
  });

  // Delete groups by exam id
  deleteGroupsByExamId = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await GroupService.deleteGroupsByExamId(
        req.params.examId
      );
      res.status(200).json(result);
    }
  );
}

export const groupController = new GroupController();