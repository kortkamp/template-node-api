import uploadConfig from '@config/upload';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';
import multer from 'multer';

import { paramsIdValidate } from '@shared/infra/http/validations/default.validation';

import { UserAvatarController } from '../controllers/UserAvatarController';
import { UsersController } from '../controllers/UsersController';
import {
  createUserValidate,
  updateUserValidate,
} from '../validations/users.validation';

const usersRoutes = Router();

const usersController = new UsersController();

const userAvatarController = new UserAvatarController();

const uploadAvatar = uploadConfig('avatar');

const upload = multer(uploadAvatar.multer);

usersRoutes.use(authMiddleware);

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.put('/:id', updateUserValidate, usersController.update);

usersRoutes.delete('/:id', paramsIdValidate, usersController.delete);

usersRoutes.get('/:id', paramsIdValidate, usersController.show);

usersRoutes.get('/', usersController.index);

usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  userAvatarController.update,
);

export { usersRoutes };
