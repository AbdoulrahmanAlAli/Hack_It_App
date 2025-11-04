import { Document, Types } from "mongoose";

export interface IAnswerBank extends Document {
  title: string;
  correct: boolean;
}

export interface IQuestionBank extends Document {
  groupBankId: Types.ObjectId;
  title: string;
  subTitle: string;
  image: string;
  answers: IAnswerBank[];
  mark: number;
  note: string;
  direction: 'ltr' | 'rtl';
}
