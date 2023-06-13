import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { examResultFilterableFields } from './examResult.constant';
import { IExamResult } from './examResult.interface';
import { ExamResultService } from './examResult.service';

const getAllResults = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, examResultFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ExamResultService.getAllResults(
    filters,
    paginationOptions
  );

  sendResponse<IExamResult[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Results retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamResultService.getSingleResult(id);

  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result retrieved successfully !',
    data: result,
  });
});

const deleteResult = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExamResultService.deleteResult(id);

  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam result deleted successfully !',
    data: result,
  });
});

export const ExamResultController = {
  deleteResult,
  getSingleResult,
  getAllResults,
};
