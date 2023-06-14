import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { examResultSearchableFields } from './examResult.constant';
import { IExamResult, IExamResultFilters } from './examResult.interface';
import { ExamResult } from './examResult.model';

const createResult = async (payload: IExamResult): Promise<IExamResult> => {
  const result = ExamResult.create(payload);
  return result;
};

const updateResult = async (
  id: string,
  payload: IExamResult
): Promise<IExamResult | null> => {
  const result = await ExamResult.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const getAllResults = async (
  filters: IExamResultFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExamResult[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: examResultSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ExamResult.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ExamResult.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleResult = async (
  id: string
): Promise<IExamResult | null> => {
  const result = await ExamResult.findById(id);
  return result;
};

export const deleteResult = async (id: string): Promise<IExamResult | null> => {
  const result = await ExamResult.findByIdAndDelete(id);
  return result;
};

export const ExamResultService = {
  createResult,
  deleteResult,
  getSingleResult,
  getAllResults,
  updateResult,
};
