// models/video-token/VideoToken.model.ts
import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IVideoToken } from "./dtos";

// Video Token Schema
const VideoTokenSchema = new Schema<IVideoToken>(
  {
    videoId: {
      type: String,
      required: [true, "معرف الفيديو مطلوب"],
      trim: true,
    },
    libraryId: {
      type: String,
      required: [true, "معرف المكتبة مطلوب"],
      trim: true,
    },
    token: {
      type: String,
      required: [true, "الرمز مطلوب"],
      unique: true,
      trim: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: [true, "المعرف مطلوب"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 ساعة
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Video Token Model
const VideoToken: Model<IVideoToken> = mongoose.model<IVideoToken>(
  "VideoToken",
  VideoTokenSchema
);

// Indexes
VideoTokenSchema.index({ expiresAt: 1 })

// Validation: Create Video Token
const validateCreateVideoToken = (obj: Partial<IVideoToken>): joi.ValidationResult => {
  const schema = joi.object({
    videoId: joi.string().required().messages({
      "string.empty": "معرف الفيديو مطلوب",
      "any.required": "معرف الفيديو مطلوب",
    }),
    libraryId: joi.string().required().messages({
      "string.empty": "معرف المكتبة مطلوب",
      "any.required": "معرف المكتبة مطلوب",
    }),
    token: joi.string().required().messages({
      "string.empty": "الرمز مطلوب",
      "any.required": "الرمز مطلوب",
    }),
    id: joi.string().required().messages({
      "string.empty": "المعرف مطلوب",
      "any.required": "المعرف مطلوب",
    }),
    userId: joi.string(),
  });

  return schema.validate(obj);
};

export { VideoToken, validateCreateVideoToken };