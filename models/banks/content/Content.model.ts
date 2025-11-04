import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IContent } from "./dtos";
import { GroupBank } from "./group/GroupBank.model";

// Content Schema
const ContentSchema = new Schema<IContent>(
  {
    bank: {
      type: Schema.Types.ObjectId,
      ref: "Bank",
      required: [true, "البنك مطلوب"],
    },
    title: {
      type: String,
      required: [true, "العنوان مطلوب"],
      trim: true,
      maxlength: [100, "العنوان يجب ألا يتجاوز 100 حرف"],
    },
    duration: {
      type: String,
      required: [true, "المدة بالدقائق مطلوبة"],
      validate: {
        validator: function(v: string) {
          // Validate time format: HH:MM or HH:MM:SS
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(v);
        },
        message: "المدة يجب أن تكون بالتنسيق 00:00 أو 00:00:00"
      }
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id;
        return ret;
      },
    },
    id: false,
  }
);

// Virtual for counting groups
ContentSchema.virtual("groupsCount", {
  ref: "GroupBank",
  localField: "_id",
  foreignField: "contentId",
  count: true,
});

ContentSchema.pre("findOneAndDelete", async function (next) {
  try {
    const content = await this.model.findOne(this.getFilter());
    if (content) {
      // نحذف جميع الـ Groups المرتبطة بهذا المحتوى
      await GroupBank.deleteMany({ contentId: content._id });
      console.log(`✅ تم حذف جميع المجموعات المرتبطة بالمحتوى ${content._id}`);
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Content Model
const Content: Model<IContent> = mongoose.model<IContent>(
  "Content",
  ContentSchema
);

// Validation Create Content
const validateCreateContent = (obj: IContent): joi.ValidationResult => {
  const schema = joi.object({
    bank: joi.string().required().messages({
      "string.empty": "البنك مطلوب",
      "any.required": "البنك مطلوب",
    }),
    title: joi.string().max(100).required().messages({
      "string.empty": "العنوان مطلوب",
      "string.max": "العنوان يجب ألا يتجاوز 100 حرف",
      "any.required": "العنوان مطلوب",
    }),
    duration: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required().messages({
      "string.empty": "المدة مطلوبة",
      "string.pattern.base": "المدة يجب أن تكون بالتنسيق 00:00 أو 00:00:00",
      "any.required": "المدة مطلوبة",
    }),
  });

  return schema.validate(obj);
};

// Validation Update Content
const validateUpdateContent = (
  obj: Partial<IContent>
): joi.ValidationResult => {
  const schema = joi.object({
    bank: joi.string().messages({
      "string.empty": "البنك مطلوب",
    }),
    title: joi.string().max(100).messages({
      "string.empty": "العنوان مطلوب",
      "string.max": "العنوان يجب ألا يتجاوز 100 حرف",
    }),
    duration: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).messages({
      "string.empty": "المدة مطلوبة",
      "string.pattern.base": "المدة يجب أن تكون بالتنسيق 00:00 أو 00:00:00",
    }),
  });

  return schema.validate(obj);
};

export { Content, validateCreateContent, validateUpdateContent };