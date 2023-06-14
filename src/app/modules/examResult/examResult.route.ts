import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExamResultController } from './examResult.controller';
import { ExamResultValidation } from './examResult.validation';

const router = express.Router();

router.post(
  '/create-result',
  validateRequest(ExamResultValidation.createExamResultZodSchema),
  ExamResultController.createResult
);

router.get('/:id', ExamResultController.getSingleResult);

router.patch('/:id', ExamResultController.updateResult);

router.delete('/:id', ExamResultController.deleteResult);

router.get('/', ExamResultController.getAllResults);

export const examResultRoutes = router;
