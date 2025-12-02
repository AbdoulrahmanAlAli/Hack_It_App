import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { INotification } from "./dtos";

// Notification Schema
const NotificationSchema = new Schema<INotification>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
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
  },
  {
    timestamps: true,
  }
);

// Virtual for student details
NotificationSchema.virtual("student", {
  ref: "Student",
  localField: "studentId",
  foreignField: "_id",
  justOne: true,
  options: { select: "userName profilePhoto" },
});

// Indexes
NotificationSchema.index({ createdAt: -1 });

// Model
const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

// Validation Schema: Create Notification
const validateCreateNotification = (
  obj: Partial<INotification>
): joi.ValidationResult => {
  const schema = joi.object({
    studentId: joi.string().allow(null, "").messages({
      "string.empty": "معرف الطالب غير صالح",
    }),
    type: joi
      .string()
      .valid("alert", "new", "success", "discount", "connection")
      .required()
      .messages({
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
  });

  return schema.validate(obj);
};

// Validation Schema: Update Notification
const validateUpdateNotification = (
  obj: Partial<INotification>
): joi.ValidationResult => {
  const schema = joi.object({
    studentId: joi.string().allow(null, "").messages({
      "string.empty": "معرف الطالب غير صالح",
    }),
    type: joi
      .string()
      .valid("alert", "new", "success", "discount", "connection")
      .messages({
        "any.only": "نوع الإشعار غير صالح",
      }),
    title: joi.string().max(200).messages({
      "string.empty": "عنوان الإشعار مطلوب",
      "string.max": "العنوان يجب ألا يتجاوز 200 حرف",
    }),
    subtitle: joi.string().max(500).messages({
      "string.empty": "النص الفرعي للإشعار مطلوب",
      "string.max": "النص الفرعي يجب ألا يتجاوز 500 حرف",
    }),
  });

  return schema.validate(obj);
};

export { Notification, validateCreateNotification, validateUpdateNotification };
