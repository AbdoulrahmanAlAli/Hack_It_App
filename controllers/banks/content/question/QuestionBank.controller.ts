import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ICloudinaryFile } from "../../../../utils/types";
import { QuestionBankService } from "../../../../services/banks/content/question/QuestionBank.service";

class QuestionBankController {
  // Create question Bank
  createQuestionBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await QuestionBankService.createQuestionBank(
      req.body,
      req.file as ICloudinaryFile
    );
    res.status(201).json(result);
  });

  // Get question Bank by ID
  getQuestionBankById = asyncHandler(async (req: Request, res: Response) => {
    const question = await QuestionBankService.getQuestionBankById(
      req.params.id
    );
    res.status(200).json(question);
  });

  // Get questions Bank by group ID
  getQuestionsBankByGroupId = asyncHandler(
    async (req: Request, res: Response) => {
      const questionsBank = await QuestionBankService.getQuestionsBankByGroupId(
        req.params.groupBankId
      );
      res.status(200).json(questionsBank);
    }
  );

  // Update question Bank
  updateQuestionBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await QuestionBankService.updateQuestionBank(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  });

  // Update question Bank image
  updateQuestionBankImage = asyncHandler(
    async (req: Request, res: Response) => {
      const result = await QuestionBankService.updateQuestionBankImage(
        req.params.id,
        req.file as ICloudinaryFile
      );
      res.status(200).json(result);
    }
  );

  // Delete question Bank
  deleteQuestionBank = asyncHandler(async (req: Request, res: Response) => {
    const result = await QuestionBankService.deleteQuestionBank(req.params.id);
    res.status(200).json(result);
  });

  // Delete questions Bank by group id
  deleteQuestionsBankByGroupId = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await QuestionBankService.deleteQuestionsBankByGroupId(
        req.params.groupBankId
      );
      res.status(200).json(result);
    }
  );

  // Delete question bank image
  deleteQuestionBankImage = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await QuestionBankService.deleteQuestionBankImage(
        req.params.id
      );
      res.status(200).json(result);
    }
  );
}

export const questionBankController = new QuestionBankController();