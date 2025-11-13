import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IAds } from "./dtos";

// Ads Schema
const AdsSchema = new Schema<IAds>(
  {
    image: {
      type: String,
      required: [true, "صورة الإعلان مطلوبة"],
      trim: true,
    }
  },
  {
    timestamps: true
  }
);

// Ads Model
const Ads: Model<IAds> = mongoose.model<IAds>("Ads", AdsSchema);

// Validation: Create Ads
const validateCreateAds = (obj: IAds): joi.ValidationResult => {
  const schema = joi.object({
    image: joi.string().required().messages({
      "string.empty": "صورة الإعلان مطلوبة",
      "any.required": "صورة الإعلان مطلوبة"
    })
  });

  return schema.validate(obj);
};

// Validation: Update Ads
const validateUpdateAds = (obj: Partial<IAds>): joi.ValidationResult => {
  const schema = joi.object({
    image: joi.string().messages({
      "string.empty": "صورة الإعلان مطلوبة"
    })
  });

  return schema.validate(obj);
};

export {
  Ads,
  validateCreateAds,
  validateUpdateAds
};