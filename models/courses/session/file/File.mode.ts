import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IFile } from "./dtos";

// File Schema
const FileSchema = new Schema<IFile>(
  {
    url: {
      type: String,
      required: [true, "رابط الملف مطلوب"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "اسم الملف مطلوب"],
      trim: true,
      maxlength: [100, "اسم الملف يجب ألا يتجاوز 100 حرف"],
    },
    type: {
      type: String,
      required: [true, "نوع الملف مطلوب"],
      enum: {
        values: [
          "pdf",
          "doc",
          "docx", 
          "xls",
          "xlsx",
          "ppt",
          "pptx",
          "jpg",
          "jpeg",
          "png",
          "mp4",
          "avi",
          "mov"
        ],
        message: "نوع الملف غير مدعوم"
      }
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "معرف الكورس مطلوب"],
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: [true, "معرف الجلسة مطلوب"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "الوصف يجب ألا يتجاوز 500 حرف"],
    },
  },
  { timestamps: true }
);

// File Model
const File: Model<IFile> = mongoose.model<IFile>("File", FileSchema);

// File Indexes
FileSchema.index({ courseId: 1 });
FileSchema.index({ sessionId: 1 });
FileSchema.index({ createdAt: -1 });

// Validation: Create File
const validateCreateFile = (obj: IFile): joi.ValidationResult => {
  const schema = joi.object({
    url: joi.string().uri().required().messages({
      "string.empty": "رابط الملف مطلوب",
      "string.uri": "يجب أن يكون رابط الملف صالحاً",
      "any.required": "رابط الملف مطلوب",
    }),
    name: joi.string().max(100).required().messages({
      "string.empty": "اسم الملف مطلوب",
      "string.max": "اسم الملف يجب ألا يتجاوز 100 حرف",
      "any.required": "اسم الملف مطلوب",
    }),
    type: joi.string().valid(
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "jpg",
      "jpeg",
      "png",
      "mp4",
      "avi",
      "mov"
    ).required().messages({
      "string.empty": "نوع الملف مطلوب",
      "any.only": "نوع الملف غير مدعوم",
      "any.required": "نوع الملف مطلوب",
    }),
    courseId: joi.string().required().messages({
      "string.empty": "معرف الكورس مطلوب",
      "any.required": "معرف الكورس مطلوب",
    }),
    sessionId: joi.string().required().messages({
      "string.empty": "معرف الجلسة مطلوب",
      "any.required": "معرف الجلسة مطلوب",
    }),
    description: joi.string().max(500).messages({
      "string.max": "الوصف يجب ألا يتجاوز 500 حرف",
    }),
  });

  return schema.validate(obj);
};

// Validation: Update File
const validateUpdateFile = (obj: Partial<IFile>): joi.ValidationResult => {
  const schema = joi.object({
    url: joi.string().uri().messages({
      "string.empty": "رابط الملف مطلوب",
      "string.uri": "يجب أن يكون رابط الملف صالحاً",
    }),
    name: joi.string().max(100).messages({
      "string.empty": "اسم الملف مطلوب",
      "string.max": "اسم الملف يجب ألا يتجاوز 100 حرف",
    }),
    type: joi.string().valid(
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "jpg",
      "jpeg",
      "png",
      "mp4",
      "avi",
      "mov"
    ).messages({
      "string.empty": "نوع الملف مطلوب",
      "any.only": "نوع الملف غير مدعوم",
    }),
    courseId: joi.string().messages({
      "string.empty": "معرف الكورس مطلوب",
    }),
    sessionId: joi.string().messages({
      "string.empty": "معرف الجلسة مطلوب",
    }),
    description: joi.string().max(500).messages({
      "string.max": "الوصف يجب ألا يتجاوز 500 حرف",
    }),
  });

  return schema.validate(obj);
};

export { File, validateCreateFile, validateUpdateFile };