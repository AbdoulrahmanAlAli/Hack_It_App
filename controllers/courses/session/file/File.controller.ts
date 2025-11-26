import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FileService } from "../../../../services/courses/session/file/File.service";

class FileController {
  // Create file
  createFile = asyncHandler(async (req: Request, res: Response) => {
    const result = await FileService.createFile(req.body);
    res.status(201).json(result);
  });

  // Get file by ID
  getFileById = asyncHandler(async (req: Request, res: Response) => {
    const file = await FileService.getFileById(req.params.id);
    res.status(200).json(file);
  });

  // Get files by session ID
  getFilesBySessionId = asyncHandler(async (req: Request, res: Response) => {
    const files = await FileService.getFilesBySessionId(req.params.sessionId);
    res.status(200).json(files);
  });

  // Get files by course ID
  getFilesByCourseId = asyncHandler(async (req: Request, res: Response) => {
    const files = await FileService.getFilesByCourseId(req.params.courseId);
    res.status(200).json(files);
  });

  // Update file
  updateFile = asyncHandler(async (req: Request, res: Response) => {
    const result = await FileService.updateFile(req.params.id, req.body);
    res.status(200).json(result);
  });

  // Delete file
  deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const result = await FileService.deleteFile(req.params.id);
    res.status(200).json(result);
  });

  // Delete files by session ID
  deleteFilesBySessionId = asyncHandler(async (req: Request, res: Response) => {
    const result = await FileService.deleteFilesBySessionId(req.params.sessionId);
    res.status(200).json(result);
  });
}

export const fileController = new FileController();