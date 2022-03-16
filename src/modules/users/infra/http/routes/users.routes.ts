import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import { createUserValidate } from '../validations/users.validation';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.get('/', usersController.index);

export { usersRoutes };
