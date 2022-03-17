import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import { createUserValidate } from '../validations/users.validation';

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

const usersController = new UsersController();

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.get('/', usersController.index);

export { usersRoutes };
