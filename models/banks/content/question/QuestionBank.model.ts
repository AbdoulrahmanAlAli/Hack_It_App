import mongoose, { Schema, Model } from "mongoose";
import joi from "joi";
import { IQuestionBank, IAnswerBank } from "./dtos";

// Answer Bank Schema
const AnswerBankSchema = new Schema<IAnswerBank>(
  {
    title: {
      type: String,
      required: [true, "عنوان الإجابة مطلوب"],
      trim: true,
    },
    correct: {
      type: Boolean,
      required: [true, "حالة الإجابة (صحيحة/خاطئة) مطلوبة"],
    },
  },
  {
    _id: true,
  }
);

// Question Bank Schema
const QuestionBankSchema = new Schema<IQuestionBank>(
  {
    groupBankId: {
      type: Schema.Types.ObjectId,
      ref: "GroupBank",
      required: [true, "معرف المجموعة مطلوب"],
    },
    title: {
      type: String,
      required: [true, "عنوان السؤال مطلوب"],
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    answers: [AnswerBankSchema],
    mark: {
      type: Number,
      required: [true, "علامة السؤال مطلوبة"],
    },
    note: {
      type: String,
      trim: true,
    },
    direction: {
      type: String,
      enum: ["ltr", "rtl"],
      default: "rtl",
      required: [true, "اتجاه النص مطلوب"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

QuestionBankSchema.virtual("requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "questionId",
});

// Question Model
const QuestionBank: Model<IQuestionBank> = mongoose.model<IQuestionBank>(
  "QuestionBank",
  QuestionBankSchema
);

// Indexes
QuestionBankSchema.index({ createdAt: -1 });

// Validation: Answer Bank
const validateAnswerBank = (obj: IAnswerBank): joi.ValidationResult => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "string.empty": "عنوان الإجابة مطلوب",
      "any.required": "عنوان الإجابة مطلوب",
    }),
    correct: joi.boolean().required().messages({
      "boolean.base": "حالة الإجابة يجب أن تكون true أو false",
      "any.required": "حالة الإجابة مطلوبة",
    }),
  });

  return schema.validate(obj);
};

// Validation: Create Question Bank
const validateCreateQuestionBank = (
  obj: IQuestionBank
): joi.ValidationResult => {
  const schema = joi.object({
    groupBankId: joi.string().required().messages({
      "string.empty": "معرف المجموعة مطلوب",
      "any.required": "معرف المجموعة مطلوب",
    }),
    title: joi.string().required().messages({
      "string.empty": "عنوان السؤال مطلوب",
      "any.required": "عنوان السؤال مطلوب",
    }),
    subTitle: joi.string().trim().allow(""),
    image: joi.string().uri().messages({
      "string.uri": "يجب أن يكون رابط الصورة صحيحًا",
    }),
    answers: joi
      .array()
      .items(
        joi.object({
          title: joi.string().required(),
          correct: joi.boolean().required(),
        })
      )
      .min(1)
      .required()
      .messages({
        "array.min": "يجب أن يحتوي السؤال على الأقل على إجابة واحدة",
        "any.required": "الإجابات مطلوبة",
      }),
    mark: joi.number().required().messages({
      "number.base": "علامة السؤال يجب أن تكون رقماً",
      "any.required": "علامة السؤال مطلوبة",
    }),
    note: joi.string().trim().allow(""),
    direction: joi.string().valid("ltr", "rtl").default("rtl").messages({
      "string.base": "الاتجاه يجب أن يكون نصاً",
      "any.only": "الاتجاه يجب أن يكون إما ltr أو rtl",
    }),
  });

  return schema.validate(obj);
};

// Validation: Update Question Bank
const validateUpdateQuestionBank = (
  obj: Partial<IQuestionBank>
): joi.ValidationResult => {
  const schema = joi.object({
    groupBankId: joi.string().messages({
      "string.empty": "معرف المجموعة مطلوب",
    }),
    title: joi.string().messages({
      "string.empty": "عنوان السؤال مطلوب",
    }),
    subTitle: joi.string().trim().allow(""),
    image: joi.string().uri().messages({
      "string.uri": "يجب أن يكون رابط الصورة صحيحًا",
    }),
    answers: joi
      .array()
      .items(
        joi.object({
          title: joi.string().required(),
          correct: joi.boolean().required(),
        })
      )
      .min(1),
    mark: joi.number().messages({
      "number.base": "علامة السؤال يجب أن تكون رقماً",
    }),
    note: joi.string().trim().allow(""),
    direction: joi.string().valid("ltr", "rtl").messages({
      "string.base": "الاتجاه يجب أن يكون نصاً",
      "any.only": "الاتجاه يجب أن يكون إما ltr أو rtl",
    }),
  });

  return schema.validate(obj);
};

export {
  QuestionBank,
  validateCreateQuestionBank,
  validateUpdateQuestionBank,
  validateAnswerBank,
};
