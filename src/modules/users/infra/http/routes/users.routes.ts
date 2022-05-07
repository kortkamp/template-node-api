import uploadConfig from '@config/upload';
import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/roles/infra/http/middlewares/ensureRolesOrSelf';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';
import multer from 'multer';

import { paramsIdValidate } from '@shared/infra/http/validations/default.validation';

import { UserAvatarController } from '../controllers/UserAvatarController';
import { UsersController } from '../controllers/UsersController';
import {
  createUserValidate,
  listUserValidate,
  updateUserValidate,
} from '../validations/users.validation';

const usersRoutes = Router();

const usersController = new UsersController();

const userAvatarController = new UserAvatarController();

const uploadAvatar = uploadConfig('avatar');

const upload = multer(uploadAvatar.multer);

usersRoutes.use(authMiddleware);

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.put(
  '/:id',
  ensureRolesOrSelf(['admin']),
  updateUserValidate,
  usersController.update,
);

usersRoutes.delete(
  '/:id',
  ensureRolesOrSelf(['admin']),
  paramsIdValidate,
  usersController.delete,
);

usersRoutes.get(
  '/:id',
  ensureRolesOrSelf(['admin']),
  paramsIdValidate,
  usersController.show,
);

usersRoutes.get(
  '/',
  ensureRoles(['admin']),
  listUserValidate,
  usersController.index,
);

usersRoutes.patch(
  '/avatar',
  upload.single('file'),
  userAvatarController.update,
);

export { usersRoutes };
