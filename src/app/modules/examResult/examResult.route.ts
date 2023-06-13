import express from 'express';
import { ExamResultController } from './examResult.controller';

const router = express.Router();

router.get('/:id', ExamResultController.getSingleResult);

router.delete('/:id', ExamResultController.deleteResult);

router.get('/', ExamResultController.getAllResults);

export const examResultRoutes = router;
