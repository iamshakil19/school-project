import { Model } from 'mongoose';

export interface IExamResult {
  name: string;
  address?: string;
  class: string;
  roll: string;
  gpa: string;
  fatherName?: string;
  motherName?: string;
}

export type ExamResultModel = Model<IExamResult>;

export interface IExamResultFilters {
  searchTerm?: string;
}
