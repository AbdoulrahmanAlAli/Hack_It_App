// src/models/version/Version.model.ts
import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IVersion } from "./dtos";

// Version Schema
const VersionSchema = new Schema<IVersion>(
  {
    version: {
      type: String,
      required: [true, "رقم الإصدار مطلوب"],
    }
  },
  {
    timestamps: true
  }
);

// Version Model
const Version: Model<IVersion> = mongoose.model<IVersion>(
  "Version",
  VersionSchema
);

// Validation: Create Version
const validateCreateVersion = (obj: IVersion): joi.ValidationResult => {
  const schema = joi.object({
    version: joi.string().required().messages({
      "string.empty": "رقم الإصدار مطلوب",
      "any.required": "رقم الإصدار مطلوب"
    })
  });

  return schema.validate(obj);
};

// Validation: Update Version
const validateUpdateVersion = (obj: Partial<IVersion>): joi.ValidationResult => {
  const schema = joi.object({
    version: joi.string().messages({
      "string.empty": "رقم الإصدار مطلوب"
    })
  });

  return schema.validate(obj);
};

export {
  Version,
  validateCreateVersion,
  validateUpdateVersion
};