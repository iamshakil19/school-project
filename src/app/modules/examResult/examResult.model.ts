import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IExamResult } from './examResult.interface';

const examResultSchema = new Schema<IExamResult>(
  {
    class: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
    },
    gpa: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

examResultSchema.pre('save', async function (next) {
  const isExist = await ExamResult.findOne({
    class: this.class,
    roll: this.roll,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Exam result is already exists !');
  }
  next();
});

export const ExamResult = model<IExamResult>('ExamResult', examResultSchema);
