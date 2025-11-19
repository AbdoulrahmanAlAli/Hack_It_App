import mongoose, { Schema, Model, Types } from "mongoose";
import joi from "joi";
import { IPaymentCode } from "./dtos";
import bcrypt from "bcrypt";

// Payment Code Schema
const PaymentCodeSchema = new Schema<IPaymentCode>(
  {
    code: {
      type: String,
      required: [true, "كود الدفع مطلوب"],
      unique: true,
      trim: true,
    },
    universityNumber: {
      type: Number,
      required: [true, "الرقم الجامعي مطلوب"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "معرف الكورس مطلوب"],
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    adminName: {
      type: String,
      required: [true, "اسم المسؤول مطلوب"],
      trim: true,
    },
    studentNumber: {
      type: String,
      required: [true, "رقم الطالب مطلوب"],
      trim: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: [true, "تاريخ الانتهاء مطلوب"],
      index: { expires: 0 }
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Code encryption before saving
PaymentCodeSchema.pre("save", async function (next) {
  if (!this.isModified("code")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.code = await bcrypt.hash(this.code, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare code method
PaymentCodeSchema.methods.compareCode = async function (candidateCode: string): Promise<boolean> {
  return bcrypt.compare(candidateCode, this.code);
};

// Payment Code Model
const PaymentCode: Model<IPaymentCode> = mongoose.model<IPaymentCode>(
  "PaymentCode",
  PaymentCodeSchema
);

// Indexes
PaymentCodeSchema.index({ createdAt: -1 });
PaymentCodeSchema.index({ universityNumber: 1 });
PaymentCodeSchema.index({ courseId: 1 });
PaymentCodeSchema.index({ adminName: 1 });

// Validation: Create Payment Code
const validateCreatePaymentCode = (obj: any): joi.ValidationResult => {
  const schema = joi.object({
    universityNumber: joi.number().required().messages({
      "number.base": "الرقم الجامعي يجب أن يكون رقمًا",
      "any.required": "الرقم الجامعي مطلوب",
    }),
    courseId: joi.string().required().messages({
      "string.empty": "معرف الكورس مطلوب",
      "any.required": "معرف الكورس مطلوب",
    }),
    adminName: joi.string().required().messages({
      "string.empty": "اسم المسؤول مطلوب",
      "any.required": "اسم المسؤول مطلوب",
    }),
    studentNumber: joi.string().required().messages({
      "string.empty": "رقم الطالب مطلوب",
      "any.required": "رقم الطالب مطلوب",
    }),
  });

  return schema.validate(obj);
};

// Validation: Use Payment Code
const validateUsePaymentCode = (obj: any): joi.ValidationResult => {
  const schema = joi.object({
    code: joi.string().required().messages({
      "string.empty": "كود الدفع مطلوب",
      "any.required": "كود الدفع مطلوب",
    }),
    universityNumber: joi.number().required().messages({
      "number.base": "الرقم الجامعي يجب أن يكون رقمًا",
      "any.required": "الرقم الجامعي مطلوب",
    }),
    studentId: joi.string().required().messages({
      "string.empty": "معرف الطالب مطلوب",
      "any.required": "معرف الطالب مطلوب",
    }),
    courseId: joi.string().required().messages({
      "string.empty": "معرف الكورس مطلوب",
      "any.required": "معرف الكورس مطلوب",
    }),
  });

  return schema.validate(obj);
};

export {
  PaymentCode,
  validateCreatePaymentCode,
  validateUsePaymentCode,
};