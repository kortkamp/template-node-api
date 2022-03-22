import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import {
  confirmUserValidate,
  createUserValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
} from '../validations/users.validation';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get('/confirm', confirmUserValidate, usersController.confirm);

usersRoutes.post(
  '/forgot-password',
  forgotPasswordValidate,
  usersController.forgotPassword,
);

usersRoutes.post(
  '/reset-password',
  resetPasswordValidate,
  usersController.resetPassword,
);

usersRoutes.use(authMiddleware);

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.get('/', usersController.index);

export { usersRoutes };
