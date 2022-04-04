import { Router } from 'express';

import { UserTokensController } from '../controllers/UserTokensController';
import {
  confirmUserValidate,
  forgotPasswordValidate,
  resetPasswordValidate,
} from '../validations/users.validation';

const userTokensRoutes = Router();

const userTokensController = new UserTokensController();

userTokensRoutes.get(
  '/confirm-user',
  confirmUserValidate,
  userTokensController.confirm,
);

userTokensRoutes.post(
  '/forgot-password',
  forgotPasswordValidate,
  userTokensController.forgotPassword,
);

userTokensRoutes.post(
  '/reset-password',
  resetPasswordValidate,
  userTokensController.resetPassword,
);

export { userTokensRoutes };
