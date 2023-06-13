import express from 'express';
import { examResultRoutes } from '../modules/examResult/examResult.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/exam-results',
    route: examResultRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
