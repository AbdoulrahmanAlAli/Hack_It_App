import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { INotification } from "./dtos";

// Notification Schema
const NotificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["alert", "new", "success", "discount", "connection"],
      required: [true, "نوع الإشعار مطلوب"],
    },
    title: {
      type: String,
      required: [true, "عنوان الإشعار مطلوب"],
      trim: true,
      maxlength: [200, "العنوان يجب ألا يتجاوز 200 حرف"],
    },
    subtitle: {
      type: String,
      required: [true, "النص الفرعي للإشعار مطلوب"],
      trim: true,
      maxlength: [500, "النص الفرعي يجب ألا يتجاوز 500 حرف"],
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
NotificationSchema.index({ createdAt: -1 });

// Model
const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

// Validation Schema
const validateCreateNotification = (obj: Partial<INotification>): joi.ValidationResult => {
  const schema = joi.object({
    type: joi.string().valid("alert", "new", "success", "discount", "connection").required().messages({
      "any.only": "نوع الإشعار غير صالح",
      "any.required": "نوع الإشعار مطلوب",
    }),
    title: joi.string().max(200).required().messages({
      "string.empty": "عنوان الإشعار مطلوب",
      "string.max": "العنوان يجب ألا يتجاوز 200 حرف",
      "any.required": "عنوان الإشعار مطلوب",
    }),
    subtitle: joi.string().max(500).required().messages({
      "string.empty": "النص الفرعي للإشعار مطلوب",
      "string.max": "النص الفرعي يجب ألا يتجاوز 500 حرف",
      "any.required": "النص الفرعي للإشعار مطلوب",
    }),
    time: joi.date().default(Date.now),
  });

  return schema.validate(obj);
};

export {
  Notification,
  validateCreateNotification,
};