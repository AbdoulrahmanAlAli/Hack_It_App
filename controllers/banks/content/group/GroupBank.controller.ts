import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { GroupBankService } from "../../../../services/banks/content/group/GroupBank.service";

class GroupBankController {
  // Create group Bank
  createGroupBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupBankService.createGroupBank(req.body);
    res.status(201).json(result);
  });

  // Get group Bank by ID
  getGroupBankById = asyncHandler(async (req: Request, res: Response) => {
    const group = await GroupBankService.getGroupBankById(req.params.id);
    res.status(200).json(group);
  });

  // Get groups Bank by content ID
  getGroupsBankByContentId = asyncHandler(
    async (req: Request, res: Response) => {
      const groupsBank = await GroupBankService.getGroupsBankByContentId(
        req.params.contentId
      );
      res.status(200).json(groupsBank);
    }
  );

  // Update group Bank
  updateGroupBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupBankService.updateGroupBank(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  });

  // Delete group Bank
  deleteGroupBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await GroupBankService.deleteGroupBank(req.params.id);
    res.status(200).json(result);
  });

  // Delete groups Bank by content id
  deleteGroupsBankByContentId = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await GroupBankService.deleteGroupsBankByContentId(
        req.params.contentId
      );
      res.status(200).json(result);
    }
  );
}

export const groupBankController = new GroupBankController();