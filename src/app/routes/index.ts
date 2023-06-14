import express from 'express';
import { examResultRoutes } from '../modules/examResult/examResult.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/exam-results',
    route: examResultRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
