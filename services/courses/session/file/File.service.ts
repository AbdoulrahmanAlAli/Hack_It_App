import mongoose from "mongoose";
import { File, validateCreateFile, validateUpdateFile } from "../../../../models/courses/session/file/File.mode";
import { IFile } from "../../../../models/courses/session/file/dtos";
import { BadRequestError, NotFoundError } from "../../../../middlewares/handleErrors";
import { Course } from "../../../../models/courses/Course.model";
import { Session } from "../../../../models/courses/session/Session.model";


class FileService {
  // Create new file
  static async createFile(fileData: IFile) {
    const { error } = validateCreateFile(fileData);
    if (error) throw new BadRequestError(error.details[0].message);

    // Verify course exists
    const course = await Course.findById(fileData.courseId);
    if (!course) throw new NotFoundError("الكورس غير موجود");

    // Verify session exists and belongs to the course
    const session = await Session.find({
      _id: fileData.sessionId,
      courseId: fileData.courseId,
    });
    if (!session) throw new NotFoundError("الجلسة غير موجودة أو لا تنتمي لهذا الكورس");

    const file = await File.create(fileData);

    // Add file to session's files array
    await Session.findByIdAndUpdate(
      fileData.sessionId,
      { $addToSet: { files: file._id } }
    );

    await file.populate("courseId", "name");
    await file.populate("sessionId", "name number");

    if (!file) throw new NotFoundError("فشل إنشاء الملف");

    return { message: "تم إنشاء الملف بنجاح", file };
  }

  // Get file by ID
  static async getFileById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("معرف الملف غير صالح");
    }

    const file = await File.findById(id)
      .populate("courseId", "name image")
      .populate("sessionId", "name number");
    
    if (!file) throw new NotFoundError("الملف غير موجود");

    return file;
  }

  // Get files by session ID
  static async getFilesBySessionId(sessionId: string) {
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestError("معرف الجلسة غير صالح");
    }

    const files = await File.find({ sessionId })
      .populate("courseId", "name")
      .populate("sessionId", "name number")
      .sort({ createdAt: -1 });

    return files;
  }

  // Get files by course ID
  static async getFilesByCourseId(courseId: string) {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new BadRequestError("معرف الكورس غير صالح");
    }

    const files = await File.find({ courseId })
      .populate("courseId", "name")
      .populate("sessionId", "name number")
      .sort({ createdAt: -1 });

    return files;
  }

  // Update file
  static async updateFile(id: string, fileData: Partial<IFile>) {
    const { error } = validateUpdateFile(fileData);
    if (error) throw new BadRequestError(error.details[0].message);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("معرف الملف غير صالح");
    }

    const existingFile = await File.findById(id);
    if (!existingFile) throw new NotFoundError("الملف غير موجود");

    // If changing courseId or sessionId, verify they exist and belong together
    if (fileData.courseId || fileData.sessionId) {
      const courseId = fileData.courseId || existingFile.courseId;
      const sessionId = fileData.sessionId || existingFile.sessionId;

      const session = await Session.find({
        _id: sessionId,
        courseId: courseId,
      });
      if (!session) throw new NotFoundError("الجلسة غير موجودة أو لا تنتمي لهذا الكورس");
    }

    const updatedFile = await File.findByIdAndUpdate(id, fileData, {
      new: true,
      runValidators: true,
    })
      .populate("courseId", "name")
      .populate("sessionId", "name number");

    if (!updatedFile) throw new NotFoundError("فشل تحديث الملف");

    return { message: "تم تحديث الملف بنجاح", file: updatedFile };
  }

  // Delete file
  static async deleteFile(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError("معرف الملف غير صالح");
    }

    const file = await File.findById(id);
    if (!file) throw new NotFoundError("الملف غير موجود");

    // Remove file from session's files array
    await Session.findByIdAndUpdate(
      file.sessionId,
      { $pull: { files: id } }
    );

    const deletedFile = await File.findByIdAndDelete(id);
    if (!deletedFile) throw new NotFoundError("فشل حذف الملف");

    return { message: "تم حذف الملف بنجاح" };
  }

  // Delete files by session ID
  static async deleteFilesBySessionId(sessionId: string) {
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      throw new BadRequestError("معرف الجلسة غير صالح");
    }

    // Get all files for this session
    const files = await File.find({ sessionId });
    
    // Delete all files
    const result = await File.deleteMany({ sessionId });

    // Clear files array in session
    await Session.findByIdAndUpdate(sessionId, { files: [] });

    return {
      message: "تم حذف جميع ملفات الجلسة بنجاح",
      deletedCount: result.deletedCount,
    };
  }
}

export { FileService };